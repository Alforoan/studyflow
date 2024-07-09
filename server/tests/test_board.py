import json
import pytest
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db  
from models import User, Board  
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


def test_create_board(client, session):
    test_email = 'test@example.com'
    user = User(email=test_email)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=test_email)
    data = {'email': test_email, 'name': 'Test Board', 'uuid': 'unique_uuid_here'}
    headers = {'Authorization': f'Bearer {access_token}'}

    try:
        response = client.post('/api/boards', json=data, headers=headers)

        assert response.status_code == 201
        assert 'message' in response.json
        assert response.json['message'] == 'Board created successfully'

        created_board = Board.query.filter_by(name='Test Board').first()
        assert created_board is not None
        assert created_board.uuid == 'unique_uuid_here'
    finally:
        if created_board:
            session.delete(created_board)
        session.delete(user)
        session.commit()

        remaining_board = Board.query.filter_by(name='Test Board').first()
        remaining_user = User.query.filter_by(email=test_email).first()

        assert remaining_board is None
        assert remaining_user is None
@pytest.mark.filterwarnings("ignore::sqlalchemy.exc.SAWarning")
def test_delete_board(client, session):
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')
    headers = {'Authorization': f'Bearer {access_token}'}

    try:
        response = client.delete(f'/api/boards/{board.uuid}', headers=headers)

        assert response.status_code == 200
        assert 'message' in response.json
        assert response.json['message'] == 'Board and associated cards deleted successfully'

        deleted_board = Board.query.filter_by(uuid='test_uuid').first()
        assert deleted_board is None
    finally:
        if board:
            session.delete(board)
        session.commit()
        remaining_board = Board.query.filter_by(uuid='test_uuid').first()
        assert remaining_board is None

def test_get_user_boards(client, session):
    test_email = 'test@example.com'
    user = User(email=test_email)
    db.session.add(user)
    db.session.commit()

    board1 = Board(name='Board 1', uuid='uuid1', user_id=user.id)
    board2 = Board(name='Board 2', uuid='uuid2', user_id=user.id)
    db.session.add_all([board1, board2])
    db.session.commit()

    access_token = create_access_token(identity=test_email)
    headers = {'Authorization': f'Bearer {access_token}'}
    try:
        response = client.get('/api/boards?email=test@example.com', headers=headers)

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 2
        assert all('id' in board and 'name' in board and 'uuid' in board for board in response.json)
    finally:
        session.delete(board1)
        session.delete(board2)
        session.delete(user)
        session.commit()

        remaining_boards = Board.query.filter_by(user_id=user.id).all()
        remaining_user = User.query.filter_by(email=test_email).first()

        assert len(remaining_boards) == 0
        assert remaining_user is None

def test_get_all_boards_as_admin(client, session):
    admin_email = 'admin@example.com'
    admin_user = User(email=admin_email, is_admin=True)
    db.session.add(admin_user)
    db.session.commit()

    board1 = Board(name='Board 1', uuid='uuid1', user_id=admin_user.id)
    board2 = Board(name='Board 2', uuid='uuid2', user_id=admin_user.id)
    db.session.add_all([board1, board2])
    db.session.commit()

    access_token = create_access_token(identity=admin_email)
    headers = {'Authorization': f'Bearer {access_token}'}

    try:
        response = client.get('/api/boards/admin?email=admin@example.com', headers=headers)

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) >= 2
        assert all('id' in board and 'name' in board and 'uuid' in board and 'user_id' in board for board in response.json)
    finally:
        session.delete(board1)
        session.delete(board2)
        session.delete(admin_user)
        session.commit()

        remaining_boards = Board.query.filter_by(user_id=admin_user.id).all()
        remaining_admin_user = User.query.filter_by(email=admin_email).first()

        assert len(remaining_boards) == 0
        assert remaining_admin_user is None

def test_edit_board(client, session):
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')

    data = {'name': 'Updated Board Name'}
    headers = {'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'}

    try:
        response = client.put(f'/api/boards/{board.uuid}', json=data, headers=headers)

        assert response.status_code == 200
        assert 'message' in response.json
        assert response.json['message'] == 'Board updated successfully'

        updated_board = Board.query.filter_by(uuid='test_uuid').first()
        assert updated_board.name == 'Updated Board Name'
    finally:
        session.delete(board)
        session.commit()

        remaining_board = Board.query.filter_by(uuid='test_uuid').first()
        assert remaining_board is None

if __name__ == '__main__':
    pytest.main()

