from faker import Faker
from models import db, User, Company, Job, Application
from app import app
from bcrypt import hashpw, gensalt
import random

faker = Faker()

print("Start seeding ....")

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()
        
    
        password_hash = hashpw('password'.encode('utf-8'), gensalt())
        users = [
            User(username='admin', email='admin@example.com', password=password_hash, is_admin=True, profile_pictures="http://example.com/profile1.jpg"),
            User(username='user1', email='user1@example.com', password=password_hash, is_admin=False, profile_pictures="http://example.com/profile2.jpg"),
            User(username='user2', email='user2@example.com', password=password_hash, is_admin=False, profile_pictures="http://example.com/profile3.jpg")
        ]

        for _ in range(10):  
            users.append(User(username=faker.user_name(), email=faker.email(), password=hashpw(faker.password().encode('utf-8'), gensalt()), profile_pictures=faker.image_url()))

        for user in users:
            db.session.add(user)

        db.session.commit()

        
        companies = [
            Company(name='Company A', description='Description A', location='Location A'),
            Company(name='Company B', description='Description B', location='Location B')
        ]

        for _ in range(5):  
            companies.append(Company(name=faker.company(), description=faker.text(), location=faker.city()))

        for company in companies:
            db.session.add(company)

        db.session.commit()

        jobs = []
        for _ in range(20):  
            job = Job(
                title=faker.job(),
                description=faker.text(),
                requirements=faker.text(),
                company_id=random.choice(companies).id
            )
            jobs.append(job)
            db.session.add(job)

        db.session.commit()

        
        applications = []
        for _ in range(50):  
            application = Application(
                user_id=random.choice(users).id,
                job_id=random.choice(jobs).id,
                status=random.choice(['pending', 'accepted', 'rejected'])
            )
            applications.append(application)
            db.session.add(application)

        db.session.commit()

if __name__ == '__main__':
    print("Seeding database...")
    seed_data()
    print("Database seeded!")
