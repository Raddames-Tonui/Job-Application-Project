from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db, User, Job, Company, Application

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False  # To display each key/value pair on a separate line

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Job Portal API"}), 200

# ======================USER ROUTES=======================
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        # Get all users
        users = User.query.all()
        if users:
            return jsonify({"users": [user.to_dict() for user in users]}), 200
        else:
            return jsonify({"message": "No users found"}), 404

    elif request.method == 'POST':
        # Create a new user
        data = request.json
        new_user = User(username=data.get('username'), email=data.get('email'), password=data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully", "user": new_user.to_dict()}), 201

@app.route('/users/<int:user_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def user(user_id):
    user = User.query.get(user_id)
    if user:
        if request.method == 'GET':
            # Get a specific user
            return jsonify({"user": user.to_dict()}), 200

        elif request.method in ['PUT', 'PATCH']:
            # Update user profile or password
            data = request.json
            if request.method == 'PUT':
                user.username = data.get('username', user.username)
                user.email = data.get('email', user.email)
            if 'password' in data:
                user.password = data['password']
            db.session.commit()
            return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

        elif request.method == 'DELETE':
            # Delete a user
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User deleted."}), 200
    else:
        return jsonify({"message": "User not found"}), 404

# ======================JOB ROUTES=====================
@app.route('/jobs', methods=['GET', 'POST'])
def jobs():
    if request.method == 'GET':
        # Get all jobs
        jobs = Job.query.all()
        if jobs:
            return jsonify({"jobs": [job.to_dict() for job in jobs]}), 200
        else:
            return jsonify({"message": "No jobs found"}), 404

    elif request.method == 'POST':
        # Create a new job
        data = request.json
        new_job = Job(title=data.get('title'), description=data.get('description'), company_id=data.get('company_id'))
        db.session.add(new_job)
        db.session.commit()
        return jsonify({"message": "Job created successfully", "job": new_job.to_dict()}), 201

@app.route('/jobs/<int:job_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def job(job_id):
    job = Job.query.get(job_id)
    if job:
        if request.method == 'GET':
            # Get a specific job with detailed description and company information
            job_info = job.to_dict()
            job_info['company'] = job.company.to_dict()
            return jsonify({"job": job_info}), 200

        elif request.method in ['PUT', 'PATCH']:
            # Update job details
            data = request.json
            job.title = data.get('title', job.title)
            job.description = data.get('description', job.description)
            db.session.commit()
            return jsonify({"message": "Job updated successfully", "job": job.to_dict()}), 200

        elif request.method == 'DELETE':
            # Delete a job
            db.session.delete(job)
            db.session.commit()
            return jsonify({"message": "Job deleted."}), 200
    else:
        return jsonify({"message": "Job not found"}), 404

# ======================COMPANY ROUTES======================
@app.route('/companies', methods=['GET', 'POST'])
def companies():
    if request.method == 'GET':
        # Get all companies
        companies = Company.query.all()
        if companies:
            return jsonify({"companies": [company.to_dict() for company in companies]}), 200
        else:
            return jsonify({"message": "No companies found"}), 404

    elif request.method == 'POST':
        # Create a new company
        data = request.json
        new_company = Company(name=data.get('name'), description=data.get('description'))
        db.session.add(new_company)
        db.session.commit()
        return jsonify({"message": "Company created successfully", "company": new_company.to_dict()}), 201

@app.route('/companies/<int:company_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def company(company_id):
    company = Company.query.get(company_id)
    if company:
        if request.method == 'GET':
            # Get a specific company
            return jsonify({"company": company.to_dict()}), 200

        elif request.method in ['PUT', 'PATCH']:
            # Update company details
            data = request.json
            company.name = data.get('name', company.name)
            company.description = data.get('description', company.description)
            db.session.commit()
            return jsonify({"message": "Company updated successfully", "company": company.to_dict()}), 200

        elif request.method == 'DELETE':
            # Delete a company
            db.session.delete(company)
            db.session.commit()
            return jsonify({"message": "Company deleted."}), 200
    else:
        return jsonify({"message": "Company not found"}), 404

# ======================APPLICATION ROUTES======================
@app.route('/applications', methods=['GET', 'POST'])
def applications():
    if request.method == 'GET':
        # Get all applications
        applications = Application.query.all()
        if applications:
            return jsonify({"applications": [application.to_dict() for application in applications]}), 200
        else:
            return jsonify({"message": "No applications found"}), 404

    elif request.method == 'POST':
        # Create a new application
        data = request.json
        new_application = Application(user_id=data.get('user_id'), job_id=data.get('job_id'), status=data.get('status'))
        db.session.add(new_application)
        db.session.commit()
        return jsonify({"message": "Application created successfully", "application": new_application.to_dict()}), 201

@app.route('/applications/<int:application_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def application(application_id):
    application = Application.query.get(application_id)
    if application:
        if request.method == 'GET':
            # Get a specific application
            return jsonify({"application": application.to_dict()}), 200

        elif request.method in ['PUT', 'PATCH']:
            # Update application status
            data = request.json
            application.status = data.get('status', application.status)
            db.session.commit()
            return jsonify({"message": "Application status updated successfully", "application": application.to_dict()}), 200

        elif request.method == 'DELETE':
            # Delete an application
            db.session.delete(application)
            db.session.commit()
            return jsonify({"message": "Application deleted."}), 200
    else:
        return jsonify({"message": "Application not found"}), 404
    

if __name__ == "__main__":
    app.run(debug=True, port=5555)
