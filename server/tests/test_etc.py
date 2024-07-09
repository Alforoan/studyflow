import json
import pytest
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db  
from models import User, Board, Card  
from flask_jwt_extended import create_access_token

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

def test_get_user_analytics(client, session):
    user_email = 'test@example.com'
    board_uuid = 'board1_uuid'

    delete_existing_user(user_email)
    delete_existing_board(board_uuid)

    user = User(email=user_email)
    board1 = Board(name='Board 1', uuid=board_uuid, user_id=user.id)
    session.add_all([user, board1])
    session.commit()

    access_token = create_access_token(identity=user_email)
    headers = {'Authorization': f'Bearer {access_token}'}

    try:
        response = client.get(f'/api/user/analytics?email={user_email}', headers=headers)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'boards' in data
        assert len(data['boards']) == 1
    finally:
        delete_existing_user(user_email)
        delete_existing_board(board_uuid)

        remaining_user = User.query.filter_by(email=user_email).first()
        remaining_board = Board.query.filter_by(uuid=board_uuid).first()

        assert remaining_user is None
        assert remaining_board is None

def test_get_metadata(client, session):
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
