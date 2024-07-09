from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Job, Company, Application
from sqlalchemy.exc import IntegrityError
from bcrypt import hashpw, gensalt, checkpw
from dotenv import load_dotenv
import os
import datetime

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY") 
app.json.compact = False  # For pretty JSON output in Flask responses

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Job Portal API"}), 200

# ===================== AUTHENTICATION ==================
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())
    new_user = User(
        username=data['username'], 
        password=hashed_password, 
        email=data['email'],
        profile_pictures=data.get('profile_pictures'),
        is_admin=data.get('is_admin', False)
        )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User with this email or username already exists"}), 400
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and checkpw(data['password'].encode('utf-8'), user.password):
        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=1))
        return jsonify({"message": "Login successful", "access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

#  ===================== USERS ==========================
# GET all users
@app.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list), 200

# GET a specific user by ID
@app.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.to_dict()), 200

# POST create a new user
@app.route('/users', methods=['POST'])
@jwt_required
def create_user():
    data = request.get_json()
    hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
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
@app.route('/users/<int:id>', methods=['PUT', 'PATCH'])
@jwt_required
def put_update_user(id):
    data = request.get_json()

    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    if request.method == 'PUT':
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password = hashpw(data['password'].encode('utf-8'), gensalt()) if 'password' in data else user.password
    elif request.method == 'PATCH':
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password = hashpw(data['password'].encode('utf-8'), gensalt()) if 'password' in data else user.password

    user.profile_pictures = data.get('profile_pictures', user.profile_pictures)
    user.is_admin = data.get('is_admin', user.is_admin)

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200


# DELETE a user by ID
@app.route('/users/<int:id>', methods=['DELETE'])
@jwt_required
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
@jwt_required
def get_all_jobs():
    jobs = Job.query.all()
    job_list = [job.to_dict() for job in jobs]
    if jobs:
        return jsonify({"jobs": job_list}), 200
    else:
        return jsonify({"message": "No jobs found"}), 404

# GET a specific job by ID
@app.route('/jobs/<int:id>', methods=['GET'])
@jwt_required
def get_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404
    return jsonify(job.to_dict()), 200


# POST create a new job
@app.route('/jobs', methods=['POST'])
@jwt_required
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
@jwt_required
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
@jwt_required
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
@jwt_required
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
@jwt_required
def get_all_companies():
    companies = Company.query.all()
    company_list = [company.to_dict() for company in companies]
    if companies:
        return jsonify({"companies": company_list}), 200
    else:
        return jsonify({"message": "No companies found"}), 404

# GET a specific company by ID
@app.route('/companies/<int:id>', methods=['GET'])
@jwt_required
def get_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    return jsonify(company.to_dict()), 200

# POST create a new company
@app.route('/companies', methods=['POST'])
@jwt_required
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
@jwt_required
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

# PUT replace a company by ID
@app.route('/companies/<int:id>', methods=['PUT'])
@jwt_required
def replace_company(id):
    data = request.get_json()
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
        
    company.name = data['name']
    company.description = data['description']
    company.location = data['location']
    
    db.session.commit()
    return jsonify({"message": "Company updated successfully", "company": company.to_dict()}), 200


# DELETE a specific company by ID
@app.route('/companies/<int:id>', methods=['DELETE'])
@jwt_required
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
@jwt_required
def get_all_applications():
    applications = Application.query.all()
    if applications:
        return jsonify({"applications": [application.to_dict() for application in applications]}), 200
    else:
        return jsonify({"message": "No applications found"}), 404
    
# GET a specific application by ID
@app.route('/applications/<int:application_id>', methods=['GET'])
@jwt_required
def get_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404
    return jsonify({"application": application.to_dict()}), 200

# POST create a new application
@app.route('/applications', methods=['POST'])
@jwt_required
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
@jwt_required
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
@jwt_required
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
@jwt_required
def delete_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    db.session.delete(application)
    db.session.commit()
    return jsonify({"message": "Application deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5555)
