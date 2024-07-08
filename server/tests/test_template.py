import json
import pytest
from datetime import datetime
import os
import sys
import uuid
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db
from flask_jwt_extended import create_access_token  
from models import Template, TemplateCard, User
from sqlalchemy.orm import mapper


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_create_template(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    template_data = {
        'name': 'Test Template',
        'author': user.email,
        'uuid': 'random',
        'downloads': 0,
        'uploaded_at': '2024-07-10T12:00:00Z'
    }

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}
    
    response = client.post('/api/templates', json=template_data, headers=headers)

    assert response.status_code == 201
    assert 'message' in response.json
    assert response.json['message'] == 'Template created successfully'
    assert 'template' in response.json

    created_template = response.json['template']

    assert created_template['name'] == template_data['name']
    assert created_template['author'] == template_data['author']
    assert created_template['uuid'] == template_data['uuid']
    assert created_template['downloads'] == template_data['downloads']
    assert created_template['uploaded_at'] == 'Wed, 10 Jul 2024 12:00:00 GMT'

def test_upload_template_card(client):
    
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    template = Template(name='Test Template', author=user.email, uuid='test_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    access_token = create_access_token(identity='test@example.com')

    card_data = {
        'cardId': 'card_id_here',
        'cardName': 'Test Card',
        'creationDate': datetime.utcnow().isoformat(),
        'order': 1,
        'column': 'Column A',
        'details': {'key': 'value'}
    }

    headers = {'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'}
    response = client.post(f'/api/templates/{template.uuid}', json=card_data, headers=headers)

    assert response.status_code == 201
    assert 'message' in response.json
    assert response.json['message'] == 'Template card added successfully'

def test_get_template_cards(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}
    template = Template(name='Test Template', author=user.email, uuid='test_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    card1 = TemplateCard(uuid='card_id_1', card_name='Card 1', upload_date=datetime.utcnow(), order=1, column_name='Column A', details={'key': 'value'}, board_id=template.uuid)
    card2 = TemplateCard(uuid='card_id_2', card_name='Card 2', upload_date=datetime.utcnow(), order=2, column_name='Column B', details={'key': 'value'}, board_id=template.uuid)
    db.session.add_all([card1, card2])
    db.session.commit()

    response = client.get(f'/api/templates/{template.uuid}', headers=headers)

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) == 2
    assert data[0]['card_id'] == 'card_id_1'
    assert data[0]['card_name'] == 'Card 1'
    assert data[1]['card_id'] == 'card_id_2'
    assert data[1]['card_name'] == 'Card 2'


def test_edit_template(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}

    template = Template(name='Test Template', author=user.email, uuid='test123_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    edit_data = {
        'name': 'Edited Template Name'
    }

    response = client.put(f'/api/templates/{template.uuid}', json=edit_data, headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Template updated successfully'

    updated_template = Template.query.filter_by(uuid=template.uuid).first()
    assert updated_template.name == edit_data['name']


def test_increment_template_downloads(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}

    template = Template(name='Test Template', author=user.email, uuid='test123_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    response = client.put(f'/api/templates/{template.uuid}/increment_downloads', headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Downloads incremented successfully'

    updated_template = Template.query.filter_by(uuid=template.uuid).first()
    assert updated_template.downloads == 1


def test_update_template_card(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    template = Template(name='Test Template', author=user.email, uuid='test123_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}

    card_data = {
        'cardName': 'Updated Card Name',
        'order': 2,
        'column': 'In Progress',
        'details': 'Updated details for the card'
    }

    card = TemplateCard(
        uuid='test_card_uuid', 
        card_name='Initial Card Name', 
        upload_date=datetime.utcnow(), 
        order=1,
        column_name='To Do', 
        details='Initial card details', 
        board_id=template.uuid
    )
    db.session.add(card)
    db.session.commit()

    response = client.put(f'/api/template_cards/{card.uuid}', json=card_data, headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Card updated successfully'

    updated_card = TemplateCard.query.filter_by(uuid=card.uuid).first()
    assert updated_card.card_name == card_data['cardName']
    assert updated_card.order == card_data['order']
    assert updated_card.column_name == card_data['column']
    assert updated_card.details == card_data['details']

@pytest.mark.filterwarnings("ignore::sqlalchemy.exc.SAWarning")
def test_delete_template(client):
    user = User(email='test@example.com')
    db.session.add(user)
    db.session.commit()

    template = Template(name='Test Template', author=user.email, uuid='test123_uuid', downloads=0, uploaded_at=datetime.utcnow())
    db.session.add(template)
    db.session.commit()

    card = TemplateCard(uuid='test_card_uuid', card_name='Test Card', upload_date=datetime.utcnow(), order=1,
                        column_name='To Do', details='Test card details', board_id=template.uuid)
    db.session.add(card)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    headers = {'Authorization': f'Bearer {access_token}'}

    response = client.delete(f'/api/templates/{template.uuid}', headers=headers)

    assert response.status_code == 200
    assert 'message' in response.json
    assert response.json['message'] == 'Template and associated cards deleted successfully'

    deleted_template = Template.query.filter_by(uuid=template.uuid).first()
    assert deleted_template is None

    deleted_card = TemplateCard.query.filter_by(uuid=card.uuid).first()
    assert deleted_card is None