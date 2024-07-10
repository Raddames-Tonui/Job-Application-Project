#!/usr/bin/env python

import random
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Job, Company, Application
from datetime import timedelta
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "$hhjdfsjhk43834892893" + str(random.randint(1, 1000000))
app.config["SECRET_KEY"] = "$hhjd4%^#7&893" + str(random.randint(1, 1000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

app.json.compact = False 

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# =========================================AUTHENTICATION=================================================
# Login
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"message": "Invalid username or password"}), 401

# Fetch current user
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user:
        return jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "is_admin": current_user.is_admin
        }), 200
    else:
        return jsonify({"Error": "User not found"}), 404

# Logout
BLACKLIST = set()

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"messsage": "Successfully logged out"}), 200

# ============================================ ROUTES ==============================================

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Job Portal API"}), 200

#  ===================== USERS ==========================
# GET all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list), 200

# GET a specific user by ID
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.to_dict()), 200

# POST create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
        is_admin=data.get('is_admin', False),
        profile_pictures = data.get('profile_pictures', None)
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully", "user": new_user.to_dict()}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User with this email or username already exists"}), 400

# PUT update a user by ID
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()

    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.is_admin = data.get('is_admin', user.is_admin)

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

# PATCH update a user by ID
@app.route('/users/<int:id>', methods=['PATCH'])
def partial_update_user(id):
    data = request.get_json()

    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.is_admin = data.get('is_admin', user.is_admin)

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

# DELETE a user by ID
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# ======================JOB ROUTES=======================

# GET all jobs
@app.route('/jobs', methods=['GET'])
def get_all_jobs():
    jobs = Job.query.all()
    job_list = [job.to_dict() for job in jobs]
    return jsonify({"jobs": job_list}), 200

# GET a specific job by ID
@app.route('/jobs/<int:id>', methods=['GET'])
def get_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404
    return jsonify(job.to_dict()), 200

# POST create a new job
@app.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    data = request.get_json()

    new_job = Job(
        title=data['title'],
        description=data['description'],
        requirements=data['requirements'],
        company_id=data['company_id']
    )

    db.session.add(new_job)
    db.session.commit()
    return jsonify({"message": "Job created successfully", "job": new_job.to_dict()}), 201

# PATCH update a job by ID
@app.route('/jobs/<int:id>', methods=['PATCH'])
@jwt_required()
def update_job(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    data = request.get_json()

    if 'title' in data:
        job.title = data['title']

    if 'description' in data:
        job.description = data['description']

    if 'requirements' in data:
        job.requirements = data['requirements']

    if 'company_id' in data:
        job.company_id = data['company_id']

    db.session.commit()
    return jsonify({"message": "Job updated successfully", "job": job.to_dict()}), 200

# PUT replace a job by ID
@app.route('/jobs/<int:id>', methods=['PUT'])
@jwt_required()
def replace_job(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    data = request.get_json()

    job.title = data['title']
    job.description = data['description']
    job.requirements = data['requirements']
    job.company_id = data['company_id']

    db.session.commit()
    return jsonify({"message": "Job replaced successfully", "job": job.to_dict()}), 200

# DELETE a job by ID
@app.route('/jobs/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_job(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200

# Job search endpoint
@app.route('/jobs/search', methods=['GET'])
def search_jobs():
    query = request.args.get('query', '')
    jobs = Job.query.filter(Job.title.ilike(f'%{query}%') | Job.description.ilike(f'%{query}%')).all()
    job_list = [job.to_dict() for job in jobs]
    return jsonify({"jobs": job_list}), 200 if jobs else jsonify({"message": "No jobs found"}), 404

# =====================COMPANY ROUTES====================

# GET all companies
@app.route('/companies', methods=['GET'])
def get_all_companies():
    companies = Company.query.all()
    company_list = [company.to_dict() for company in companies]
    return jsonify(company_list), 200

# GET a specific company by ID
@app.route('/companies/<int:id>', methods=['GET'])
def get_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    return jsonify(company.to_dict()), 200

# POST create a new company
@app.route('/companies', methods=['POST'])
@jwt_required()
def create_company():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    data = request.get_json()

    new_company = Company(
        name=data['name'],
        description=data['description'],
        location=data['location']
    )

    db.session.add(new_company)
    db.session.commit()
    return jsonify({"message": "Company created successfully", "company": new_company.to_dict()}), 201

# PATCH update a company by ID
@app.route('/companies/<int:id>', methods=['PATCH'])
@jwt_required()
def update_company(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404

    data = request.get_json()

    if 'name' in data:
        company.name = data['name']

    if 'description' in data:
        company.description = data['description']

    if 'location' in data:
        company.location = data['location']

    db.session.commit()
    return jsonify({"message": "Company updated successfully", "company": company.to_dict()}), 200

# DELETE a company by ID
@app.route('/companies/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_company(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user.is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404

    db.session.delete(company)
    db.session.commit()
    return jsonify({"message": "Company deleted successfully"}), 200

# ====================APPLICATION ROUTES=================

# GET all applications
@app.route('/applications', methods=['GET'])
def get_all_applications():
    applications = Application.query.all()
    application_list = [application.to_dict() for application in applications]
    return jsonify(application_list), 200

# GET a specific application by ID
@app.route('/applications/<int:id>', methods=['GET'])
def get_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({"message": "Application not found"}), 404
    return jsonify(application.to_dict()), 200

# POST create a new application
@app.route('/applications', methods=['POST'])
@jwt_required()
def create_application():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_application = Application(
        user_id=current_user_id,
        job_id=data['job_id'],
        status=data['status']
    )

    db.session.add(new_application)
    db.session.commit()
    return jsonify({"message": "Application created successfully", "application": new_application.to_dict()}), 201

# PATCH update an application by ID
@app.route('/applications/<int:id>', methods=['PATCH'])
@jwt_required()
def update_application(id):
    current_user_id = get_jwt_identity()
    application = Application.query.get(id)

    if not application:
        return jsonify({"message": "Application not found"}), 404

    if not application.user_id == current_user_id and not User.query.get(current_user_id).is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    data = request.get_json()

    if 'status' in data:
        application.status = data['status']

    db.session.commit()
    return jsonify({"message": "Application updated successfully", "application": application.to_dict()}), 200

# PUT replace an application by ID
@app.route('/applications/<int:id>', methods=['PUT'])
@jwt_required()
def replace_application(id):
    current_user_id = get_jwt_identity()
    application = Application.query.get(id)

    if not application:
        return jsonify({"message": "Application not found"}), 404

    if not application.user_id == current_user_id and not User.query.get(current_user_id).is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    data = request.get_json()

    application.job_id = data['job_id']
    application.status = data['status']

    db.session.commit()
    return jsonify({"message": "Application replaced successfully", "application": application.to_dict()}), 200

# DELETE an application by ID
@app.route('/applications/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_application(id):
    current_user_id = get_jwt_identity()
    application = Application.query.get(id)

    if not application:
        return jsonify({"message": "Application not found"}), 404

    if not application.user_id == current_user_id and not User.query.get(current_user_id).is_admin:
        return jsonify({"message": "Access forbidden"}), 403

    db.session.delete(application)
    db.session.commit()
    return jsonify({"message": "Application deleted successfully"}), 200

# GET applications for a specific user
@app.route('/users/<int:user_id>/applications', methods=['GET'])
def get_user_applications(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    applications = Application.query.filter_by(user_id=user_id).all()
    return jsonify({"applications": [application.to_dict() for application in applications]}), 200

# GET applications for a specific job
@app.route('/jobs/<int:job_id>/applications', methods=['GET'])
def get_job_applications(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    applications = Application.query.filter_by(job_id=job_id).all()
    return jsonify({"applications": [application.to_dict() for application in applications]}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5555)
