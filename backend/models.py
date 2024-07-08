from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, func
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True) # index = True improves query performance on  fields.
    email = db.Column(db.String(50), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    profile_pictures = db.Column(db.String(300))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.datetime, default=db.func.now())
    updated_at = db.Column(db.datetime, default=db.func.now(), onupdate=db.func.now())

    applications = db.relationship("Application", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.email}, {self.is_admin}>'

class Job(db.Model, SerializerMixin):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    company = db.relationship("Company", back_populates="jobs")
    applications = db.relationship("Application", back_populates="job", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Job {self.id}, {self.title}>'
    
class Company(db.Model, SerializerMixin):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, index=True) 
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    jobs = db.relationship("Job", back_populates="company")

    def __repr__(self):
        return f'<Company {self.id}, {self.name}>'

# Association table to store many-to-many relationship between job and user
class Application(db.Model, SerializerMixin):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), default='pending')
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="applications")
    job = db.relationship("Job", back_populates="applications")

    def __repr__(self):
        return f'<Application {self.id}, {self.status}>'