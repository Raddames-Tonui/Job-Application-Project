# !/usr/bin/env python

import random
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Job, Company, Application
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "$hhjdfsjhk43834892893" + str(random.randint(1, 1000000))
app.config["SECRET_KEY"] = "$hhjd4%^#7&893" + str(random.randint(1, 1000000))
app.json.compact = False 

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)


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
        profile_pictures=data.get('profile_pictures'),
        is_admin=data.get('is_admin', False)
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
    user.password = data.get('password', user.password)
    user.profile_pictures = data.get('profile_pictures', user.profile_pictures)
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
    user.password = data.get('password', user.password)
    user.profile_pictures = data.get('profile_pictures', user.profile_pictures)
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
    if jobs:
        return jsonify({"jobs": job_list}), 200
    else:
        return jsonify({"message": "No jobs found"}), 404

# GET a specific job by ID
@app.route('/jobs/<int:id>', methods=['GET'])
def get_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404
    return jsonify(job.to_dict()), 200


# POST create a new job
@app.route('/jobs', methods=['POST'])
def create_job():
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
def update_job(id):
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
def replace_job(id):
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
def delete_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200



# ======================COMPANY ROUTES======================

# GET all companies
@app.route('/companies', methods=['GET'])
def get_all_companies():
    companies = Company.query.all()
    company_list = [company.to_dict() for company in companies]
    if companies:
        return jsonify({"companies": company_list}), 200
    else:
        return jsonify({"message": "No companies found"}), 404

# GET a specific company by ID
@app.route('/companies/<int:id>', methods=['GET'])
def get_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    return jsonify(company.to_dict()), 200

# POST create a new company
@app.route('/companies', methods=['POST'])
def create_company():
    data = request.get_json()

    new_company = Company(
        name=data['name'],
        description=data['description'],
        location=data['location']
    )

    db.session.add(new_company)
    db.session.commit()
    return jsonify({"message": "Company created successfully", "company": new_company.to_dict()}), 201

# PATCH update a specific company by ID
@app.route('/companies/<int:id>', methods=['PATCH'])
def update_company(id):
    data = request.get_json()

    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404

    if 'name' in data:
        company.name = data['name']

    if 'description' in data:
        company.description = data['description']

    if 'location' in data:
        company.location = data['location']

    # Update jobs related to this company if 'jobs' is provided in data
    if 'jobs' in data:
        for job_data in data['jobs']:
            job_id = job_data.get('id')
            if job_id:
                job = Job.query.get(job_id)
                if job:
                    job.company_id = company.id
                    db.session.commit()

    db.session.commit()
    return jsonify({"message": "Company updated successfully", "company": company.to_dict()}), 200

# DELETE a specific company by ID
@app.route('/companies/<int:id>', methods=['DELETE'])
def delete_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404

    db.session.delete(company)
    db.session.commit()
    return jsonify({"message": "Company deleted successfully"}), 200


# ======================APPLICATION ROUTES======================

# GET all applications
@app.route('/applications', methods=['GET'])
def get_all_applications():
    applications = Application.query.all()
    if applications:
        return jsonify({"applications": [application.to_dict() for application in applications]}), 200
    else:
        return jsonify({"message": "No applications found"}), 404
    
# GET a specific application by ID
@app.route('/applications/<int:application_id>', methods=['GET'])
def get_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404
    return jsonify({"application": application.to_dict()}), 200

# POST create a new application
@app.route('/applications', methods=['POST'])
def create_application():
    data = request.get_json()

    new_application = Application(
        user_id=data['user_id'],
        job_id=data['job_id'],
        status=data.get('status', 'pending')
    )

    db.session.add(new_application)
    db.session.commit()
    return jsonify({"message": "Application created successfully", "application": new_application.to_dict()}), 201

# PUT update an application by ID
@app.route('/applications/<int:application_id>', methods=['PUT'])
def update_application(application_id):
    data = request.get_json()

    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    if 'status' in data:
        application.status = data['status']

    if 'job_id' in data:
        job = Job.query.get(data['job_id'])
        if job:
            application.job = job
        else:
            return jsonify({"message": "Job not found"}), 404

    if 'user_id' in data:
        user = User.query.get(data['user_id'])
        if user:
            application.user = user
        else:
            return jsonify({"message": "User not found"}), 404

    db.session.commit()
    return jsonify({"message": "Application updated successfully", "application": application.to_dict()}), 200

# PATCH partially update an application by ID
@app.route('/applications/<int:application_id>', methods=['PATCH'])
def partial_update_application(application_id):
    data = request.get_json()

    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    if 'status' in data:
        application.status = data['status']

    if 'job_id' in data:
        job = Job.query.get(data['job_id'])
        if job:
            application.job = job
        else:
            return jsonify({"message": "Job not found"}), 404

    if 'user_id' in data:
        user = User.query.get(data['user_id'])
        if user:
            application.user = user
        else:
            return jsonify({"message": "User not found"}), 404

    db.session.commit()
    return jsonify({"message": "Application updated successfully", "application": application.to_dict()}), 200

# DELETE an application by ID
@app.route('/applications/<int:application_id>', methods=['DELETE'])
def delete_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    db.session.delete(application)
    db.session.commit()
    return jsonify({"message": "Application deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5555)
