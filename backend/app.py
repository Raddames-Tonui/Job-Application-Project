#!/usr/bin/env python3

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db, User, Job, Company, Application

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs_database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False  # To display each key/value pair on a separate line

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Job Portal API"}), 200

# ======================USER ROUTES=======================
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"users": [user.to_dict() for user in users]}), 200
    else:
        return jsonify({"message": "No users found"}), 404

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"user": user.to_dict()}), 200
    else:
        return jsonify({"message": "User not found"}), 404

# ======================JOB ROUTES=====================
@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    if jobs:
        return jsonify({"jobs": [job.to_dict() for job in jobs]}), 200
    else:
        return jsonify({"message": "No jobs found"}), 404

@app.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if job:
        return jsonify({"job": job.to_dict()}), 200
    else:
        return jsonify({"message": "Job not found"}), 404

# ======================COMPANY ROUTES======================
@app.route('/companies', methods=['GET'])
def get_companies():
    companies = Company.query.all()
    if companies:
        return jsonify({"companies": [company.to_dict() for company in companies]}), 200
    else:
        return jsonify({"message": "No companies found"}), 404

@app.route('/companies/<int:company_id>', methods=['GET'])
def get_company(company_id):
    company = Company.query.get(company_id)
    if company:
        return jsonify({"company": company.to_dict()}), 200
    else:
        return jsonify({"message": "Company not found"}), 404

# ======================APPLICATION ROUTES======================
@app.route('/applications', methods=['GET'])
def get_applications():
    applications = Application.query.all()
    if applications:
        return jsonify({"applications": [application.to_dict() for application in applications]}), 200
    else:
        return jsonify({"message": "No applications found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5555)
