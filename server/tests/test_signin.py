import json
import pytest
import os
import sys
from flask import Flask
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db 

from models import User  

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    
    # Initialize SQLAlchemy with the app context
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        yield app  # Pass the app instance to tests
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """Create a test client for the app."""
    return app.test_client()

@pytest.fixture
def session(app):
    """Create a new database session for each test."""
    with app.app_context():
        yield db.session

def test_sign_in_existing_user(client, session):
    """Test signing in an existing user."""
    test_email = 'test33452@example.com'
    user = User(email=test_email)
    session.add(user)
    session.commit()
  
    data = {'email': test_email}
    response = client.post('/api/signin', json=data)

    assert response.status_code == 200
    assert 'access_token' in response.json


# def test_sign_in_new_user(client):
#     data = {'email': 'newuser@example.com'}
#     response = client.post('/api/signin', json=data)
#     assert response.status_code == 200
#     assert 'access_token' in response.json

# def test_sign_in_invalid_method(client):
#     response = client.get('/api/signin')
#     assert response.status_code == 405
#     assert 'Only POST requests are allowed'
