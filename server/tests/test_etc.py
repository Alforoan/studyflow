import json
import pytest
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db  
from models import User, Board, Card  
from flask_jwt_extended import create_access_token

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

def delete_existing_user(email):
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        db.session.delete(existing_user)
        db.session.commit()

def delete_existing_board(uuid):
    existing_board = Board.query.filter_by(uuid=uuid).first()
    if existing_board:
        db.session.delete(existing_board)
        db.session.commit()

def test_get_user_analytics(client):
    with app.app_context():
        delete_existing_user('test@example.com')
        delete_existing_board('board1_uuid')
        user = User(email='test@example.com')
        board1 = Board(name='Board 1', uuid='board1_uuid')
        db.session.add_all([user, board1])
        db.session.commit()

        access_token = create_access_token(identity='test@example.com')

        headers = {'Authorization': f'Bearer {access_token}'}
        response = client.get('/api/user/analytics?email=test@example.com', headers=headers)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'boards' in data
        assert len(data['boards']) == 1

def test_get_metadata(client):
    response = client.get('/api/metadata?url=https://example.com')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'title' in data
    assert 'favicon' in data

    response_invalid = client.get('/api/metadata')
    assert response_invalid.status_code == 400
    error_data = json.loads(response_invalid.data)
    assert 'error' in error_data

    response_failed = client.get('/api/metadata?url=https://invalid-url.com')
    assert response_failed.status_code == 500
    error_data_failed = json.loads(response_failed.data)
    assert 'error' in error_data_failed
