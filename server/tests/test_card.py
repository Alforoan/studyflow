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
            db.session.remove()
            db.drop_all()

def test_add_card_to_board(client):
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')

    data = {
        'cardId': 'card_id_here',
        'cardName': 'Card Name',
        'creationDate': '2024-07-10T12:00:00Z',
        'order': 1,
        'column': 'Column Name',
        'details': 'Card Details'
    }
    headers = {'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'}
    response = client.post(f'/api/boards/{board.uuid}', json=data, headers=headers)

    assert response.status_code == 201
    assert 'message' in response.json
    assert response.json['message'] == 'Card added successfully'

def test_get_cards_for_board(client):
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()

    card1 = Card(card_id='card_id1', card_name='Card 1', creation_date='2024-07-10T12:00:00Z', order=1,
                 column_name='Column A', details='Details A', board_id=board.uuid)
    card2 = Card(card_id='card_id2', card_name='Card 2', creation_date='2024-07-10T13:00:00Z', order=2,
                 column_name='Column B', details='Details B', board_id=board.uuid)
    db.session.add_all([card1, card2])
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')

    headers = {'Authorization': f'Bearer {access_token}'}
    response = client.get(f'/api/boards/{board.uuid}', headers=headers)

    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 2
    assert all('id' in card and 'card_id' in card and 'card_name' in card for card in response.json)

def test_update_card(client):
    
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()
    card_id = 'card_id_here'
    card = Card(
        card_id=card_id, 
        card_name='Initial Card Name', 
        order=1, column_name='Column A', 
        details='Details A', creation_date='2024-07-10T13:00:00Z', 
        board_id=board.uuid
    )
    db.session.add(card)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')

    data = {
        'cardName': 'Updated Card Name',
        'order': 2,
        'column': 'Column B',
        'details': 'Updated Details',
    }
    headers = {'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'}
    response = client.put(f'/api/cards/{card_id}', json=data, headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Card updated successfully'

    updated_card = Card.query.filter_by(card_id=card_id).first()
    assert updated_card.card_name == 'Updated Card Name'
    assert updated_card.order == 2
    assert updated_card.column_name == 'Column B'
    assert updated_card.details == 'Updated Details'

def test_delete_card(client):
    board = Board(name='Test Board', uuid='test_uuid')
    db.session.add(board)
    db.session.commit()

    card_id = 'card_id_here'
    card = Card(
        card_id=card_id,
        card_name='Test Card',
        order=1,
        column_name='Column A',
        details='Card Details',
        creation_date='2024-07-10T13:00:00Z',
        board_id=board.uuid
    )
    db.session.add(card)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')
    headers = {'Authorization': f'Bearer {access_token}'}
    response = client.delete(f'/api/cards/{card_id}', headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Card deleted successfully'

    deleted_card = Card.query.filter_by(card_id=card_id).first()
    assert deleted_card is None
