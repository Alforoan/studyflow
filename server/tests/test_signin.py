import json
import pytest
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db  
from models import User  

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_sign_in_existing_user(client):
    test_email = 'test2@example.com'
    user = User(email=test_email)
    db.session.add(user)
    db.session.commit()

    data = {'email': test_email}
    response = client.post('/api/signin', json=data)
    assert response.status_code == 200
    assert 'access_token' in response.json

def test_sign_in_new_user(client):
    data = {'email': 'newuser@example.com'}
    response = client.post('/api/signin', json=data)
    assert response.status_code == 201
    assert 'access_token' in response.json

def test_sign_in_invalid_method(client):
    response = client.get('/api/signin')
    assert response.status_code == 405
    assert 'Only POST requests are allowed'
