from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Job, Company, Application
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False  # For pretty JSON output in Flask responses

db.init_app(app)
migrate = Migrate(app, db)

# Welcome message
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Job Portal API"}), 200

#  ===================== LOGINs ==========================
# ======================USER ROUTES=======================
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        if users:
            return jsonify({"users": [user.to_dict() for user in users]}), 200
        else:
            return jsonify({"message": "No users found"}), 404

    elif request.method == 'POST':
        data = request.get_json()

        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],
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


@app.route('/users/<int:id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    if request.method == 'GET':
        return jsonify(user.to_dict()), 200

    elif request.method in ['PUT', 'PATCH']:
        data = request.get_json()

        if 'email' in data:
            user.email = data['email']

        if 'username' in data:
            user.username = data['username']

        if 'password' in data:
            user.password = data['password']

        if 'profile_pictures' in data:
            user.profile_pictures = data['profile_pictures']

        if 'is_admin' in data:
            user.is_admin = data['is_admin']

        db.session.commit()
        return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200

    else:
        return jsonify({"message": "Method not allowed"}), 405


# ======================JOB ROUTES=======================
@app.route('/jobs', methods=['GET', 'POST'])
def jobs():
    if request.method == 'GET':
        jobs = Job.query.all()
        if jobs:
            return jsonify({"jobs": [job.to_dict() for job in jobs]}), 200
        else:
            return jsonify({"message": "No jobs found"}), 404

    elif request.method == 'POST':
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


@app.route('/jobs/<int:id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"message": "Job not found"}), 404

    if request.method == 'GET':
        return jsonify(job.to_dict()), 200

    elif request.method in ['PUT', 'PATCH']:
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

    elif request.method == 'DELETE':
        db.session.delete(job)
        db.session.commit()
        return jsonify({"message": "Job deleted successfully"}), 200

    else:
        return jsonify({"message": "Method not allowed"}), 405


# ======================COMPANY ROUTES======================
@app.route('/companies', methods=['GET', 'POST'])
def companies():
    if request.method == 'GET':
        companies = Company.query.all()
        if companies:
            return jsonify({"companies": [company.to_dict() for company in companies]}), 200
        else:
            return jsonify({"message": "No companies found"}), 404

    elif request.method == 'POST':
        data = request.get_json()

        new_company = Company(
            name=data['name'],
            description=data['description'],
            location=data['location']
        )

        db.session.add(new_company)
        db.session.commit()
        return jsonify({"message": "Company created successfully", "company": new_company.to_dict()}), 201


@app.route('/companies/<int:id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"message": "Company not found"}), 404

    if request.method == 'GET':
        return jsonify(company.to_dict()), 200

    elif request.method in ['PUT', 'PATCH']:
        data = request.get_json()

        if 'name' in data:
            company.name = data['name']

        if 'description' in data:
            company.description = data['description']

        if 'location' in data:
            company.location = data['location']

        # Update jobs related to this company if company_id is provided
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

    elif request.method == 'DELETE':
        db.session.delete(company)
        db.session.commit()
        return jsonify({"message": "Company deleted successfully"}), 200

    else:
        return jsonify({"message": "Method not allowed"}), 405



# ======================APPLICATION ROUTES======================
@app.route('/applications', methods=['GET', 'POST'])
def applications():
    if request.method == 'GET':
        applications = Application.query.all()
        if applications:
            return jsonify({"applications": [application.to_dict() for application in applications]}), 200
        else:
            return jsonify({"message": "No applications found"}), 404

    elif request.method == 'POST':
        data = request.get_json()

        new_application = Application(
            user_id=data['user_id'],
            job_id=data['job_id'],
            status=data.get('status', 'pending')
        )

        db.session.add(new_application)
        db.session.commit()
        return jsonify({"message": "Application created successfully", "application": new_application.to_dict()}), 201


@app.route('/applications/<int:application_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    if request.method == 'GET':
        return jsonify({"application": application.to_dict()}), 200

    elif request.method in ['PUT', 'PATCH']:
        data = request.get_json()

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

    elif request.method == 'DELETE':
        db.session.delete(application)
        db.session.commit()
        return jsonify({"message": "Application deleted successfully"}), 200

    else:
        return jsonify({"message": "Method not allowed"}), 405


if __name__ == "__main__":
    app.run(debug=True, port=5555)
