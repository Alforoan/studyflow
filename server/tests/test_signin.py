import json
import pytest
import os
import sys
from flask import Flask
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db
from models import User  

@pytest.fixture
def create_app():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.app_context():
        db.create_all()
        yield app  
        
@pytest.fixture
def client(create_app):
    return create_app.test_client()

@pytest.fixture
def session(create_app):
    with create_app.app_context():
        yield db.session

def test_sign_in_existing_user(client, session):
    test_email = 'test33452@example.com'
    user = User(email=test_email)
    session.add(user)
    session.commit()
    data = {'email': test_email}
    response = client.post('/api/signin', json=data)
    assert response.status_code == 200
    assert 'access_token' in response.json
    session.delete(user)
    session.commit()
    remaining_user = User.query.filter_by(email=test_email).first()
    assert remaining_user is None

def test_sign_in_invalid_method(client):
    response = client.get('/api/signin')
    assert response.status_code == 405
    assert 'Only POST requests are allowed'
