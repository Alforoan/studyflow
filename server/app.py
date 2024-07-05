from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_migrate import Migrate
from flask_login import UserMixin, LoginManager, current_user, login_required
from wtforms import SelectField
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

load_dotenv()

app = Flask(__name__)
db_uri = f'{os.getenv("DB_URI")}'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config['SECRET_KEY'] = os.getenv("SECRET")
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

allowed_origins = ["http://localhost:5173", "https://studyflow.onrender.com"]
cors = CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=True)

db = SQLAlchemy(app)
jwt = JWTManager(app)
from models import User, Board, Card, Template, TemplateCard

class BoardView(ModelView):
    column_list = ('id', 'name', 'uuid', 'user_id') 
    form_columns = ('name', 'uuid', 'user_id')  

class CardView(ModelView):
    form_columns = ('card_id', 'card_name', 'creation_date', 'order', 'column_name', 'details', 'board_id')  

admin = Admin(app, name='Admin Panel')

admin.add_view(ModelView(User, db.session))
admin.add_view(BoardView(Board, db.session))
admin.add_view(CardView(Card, db.session))

@app.route('/', methods=['GET'])
def home():
  return 'Hello df'

@app.route('/api/signin', methods=['POST'])
def sign_in_or_create_user():
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            access_token = create_access_token(identity=email)
            is_admin = user.is_admin
            return jsonify({'message': 'Sign in successful', 'access_token': access_token, 'is_admin': is_admin}), 200
        else:
            user = User(email=email)
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=email)
            user = User.query.filter_by(email=email).first()
            return jsonify({'message': 'User created successfully', 'access_token': access_token}), 201
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards', methods=['POST'])
@jwt_required()
def create_board():
    current_user = get_jwt_identity()

    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        if current_user != email:
            return jsonify({'error': 'Email does not match current user'}), 401
        name = data.get('name')
        uuid = data.get('uuid')
        user = User.query.filter_by(email=email).first()
        print('user', user.email)
        name_exists = Board.query.filter_by(user_id=user.id, name=name).first()
        user_id = user.id
        if name_exists:
            return jsonify({'error': 'Board name already exists'}), 400
        if user:
            board = Board(name=name, user_id=user_id, uuid=uuid)
            db.session.add(board)
            db.session.commit()
            user = User.query.filter_by(email=email).first()
            return jsonify({'message': 'Board created successfully'}), 201
        else:
            return jsonify({'error': 'Name is required for creating a board'}), 400
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards/<board_id>', methods=['DELETE'])
@jwt_required()
def delete_board(board_id):
    board = Board.query.filter_by(uuid=board_id).first()
    cards = Card.query.filter_by(board_id=board_id).all()
    if not board:
        return jsonify({'error': 'Board not found'}), 404
    try:
        for card in cards:
            db.session.delete(card)
        db.session.delete(board)
        db.session.commit()
        return jsonify({'message': 'Board and associated cards deleted successfully'}), 200

    except Exception as e:
        db.session.rollback() 
        print(e)
        return jsonify({'error': 'Failed to delete board and associated cards'}), 500


@app.route('/api/boards', methods=['GET'])
@jwt_required()
def get_user_boards():
    current_user = get_jwt_identity()
    email = request.args.get('email')
    if current_user != email:
        return jsonify({'error': 'Email parameter does not match the JWT identity'}), 401
    if not email:
        return jsonify({'error': 'Email parameter is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_id = user.id
    boards = Board.query.filter_by(user_id=user_id).all()
    board_list = [{'id': board.id, 'name': board.name, 'uuid': board.uuid} for board in boards]
    return jsonify(board_list), 200

@app.route('/api/boards/admin', methods=['GET'])
@jwt_required()
def get_all_boards():
    data = request.data
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if user.is_admin:
        boards = Board.query.all()
        print('ALL BOARDS HERE ', boards)
        board_list = [{'id': board.id, 'name': board.name, 'uuid': board.uuid, 'user_id': board.user_id} for board in boards]
        return jsonify(board_list), 200
    else:
        return jsonify({'error': 'You do not have permission to access this endpoint'}), 403

    
@app.route('/api/boards/<board_id>', methods=['PUT'])
@jwt_required()
def edit_board(board_id):
    board = Board.query.filter_by(uuid=str(board_id)).first()
    if not board:
        return jsonify({'error': 'Board not found'}), 404
    
    data = request.json
    name = data.get('name')
    
    if name:
        if Board.query.filter(Board.uuid != str(board_id), Board.name == name).first():
            return jsonify({'error': 'Board name already exists'}), 400
        board.name = name
    db.session.commit()
    
    return jsonify({'message': 'Board updated successfully'}), 200


@app.route('/api/boards/<board_id>', methods=['POST'])
@jwt_required()
def add_card_to_board(board_id):
    if request.method == 'POST':
        data = request.get_json()
        card_id = data.get('cardId')
        card_name = data.get('cardName')
        creation_date = data.get('creationDate')
        order = data.get('order')
        column_name = data.get('column')
        details = data.get('details')

        board = Board.query.filter_by(uuid=board_id).first()
        if board:
            card = Card(card_id=card_id, card_name=card_name, creation_date=creation_date,
                        order=order, column_name=column_name, details=details, board_id=board_id)
            db.session.add(card)
            db.session.commit()
            return jsonify({'message': 'Card added successfully'}), 201
        else:
            return jsonify({'error': 'Board not found'}), 404
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards/<board_id>', methods=['GET'])
@jwt_required()
def get_cards_for_board(board_id):
    if request.method == 'GET':
        cards = Card.query.filter_by(board_id=board_id).all()
        cards_data = [{
            'id': card.id,
            'card_id': card.card_id,
            'card_name': card.card_name,
            'creation_date': card.creation_date.isoformat(),  
            'order': card.order,
            'column_name': card.column_name,
            'details': card.details,
            'board_id': card.board_id
        } for card in cards]

        return jsonify(cards_data), 200
    else:
        return jsonify({'error': 'Only GET requests are allowed for this endpoint'}), 405

@app.route('/api/cards/<string:card_id>', methods=['PUT'])
@jwt_required()
def update_card(card_id):
    if request.method == 'PUT':
        data = request.get_json()
        card_name = data.get('cardName')
        order = data.get('order')
        column_name = data.get('column')
        details = data.get('details')
        card = Card.query.filter_by(card_id=card_id).first()
        if card:
            card.card_name = card_name
            card.order = order
            card.column_name = column_name
            card.details = details
            db.session.commit()
            return jsonify({'message': 'Card updated successfully'}), 200
        else:
            return jsonify({'error': 'Card not found'}), 404
    else:
        return jsonify({'error': 'Only PUT requests are allowed for this endpoint'}), 405

@app.route('/api/cards/<string:card_id>', methods=['DELETE'])
@jwt_required()
def delete_card(card_id):
    if request.method == 'DELETE':
        card = Card.query.filter_by(card_id=card_id).first()
        if card:
            db.session.delete(card)
            db.session.commit()
            return jsonify({'message': 'Card deleted successfully'}), 200
        else:
            return jsonify({'error': 'Card not found'}), 404
    else:
        return jsonify({'error': 'Only DELETE requests are allowed for this endpoint'}), 405

@app.route('/api/user/analytics', methods=['GET'])
@jwt_required()
def get_user_analytics():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    boards = user.boards
    num_of_cards = 0
    total_time_spent = 0
    for board in boards:
        cards_count = Card.query.filter_by(board_id=board.uuid).count()
        cards = Card.query.filter_by(board_id=board.uuid).all()
        for card in cards:
            if card.column_name == 'Completed':
                print('DETAIL OF THE CARD ', card.details)
                details_str = card.details
                details_dict = json.loads(details_str)
                timeEstimate = details_dict['timeEstimate']
                total_time_spent += timeEstimate
        num_of_cards += cards_count
    
    board_info = [{'board_count': len(boards), 'card_count': num_of_cards, 'total_time_spent':total_time_spent}]
    return jsonify({'boards': board_info})

@app.route('/api/metadata', methods=['GET'])
def get_metadata():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    try:
        response = requests.get(url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch URL"}), response.status_code

        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Get the title
        title = soup.title.string if soup.title else None
        if not title:
            parsed_url = urlparse(url)
            domain = parsed_url.netloc
            title = domain

       # Get the favicon
        icon_link = soup.find("link", rel="shortcut icon")
        if icon_link is None:
            icon_link = soup.find("link", rel="icon")
        if icon_link is None:
            favicon_url = urlparse(url).scheme + "://" + urlparse(url).netloc + '/favicon.ico'
            try:
                response = requests.get(favicon_url)
                if response.status_code != 200:
                    favicon_url = ""
            except requests.exceptions.RequestException:
                favicon_url = ""
        else:
            favicon_url = icon_link["href"]
            if not favicon_url.startswith('http'):
                favicon_url = urlparse(url).scheme + "://" + urlparse(url).netloc + favicon_url

        return jsonify({
            "title": title,
            "favicon": favicon_url
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/templates', methods=['POST'])
def create_template():
    data = request.get_json()
    name = data.get('name')
    author = data.get('author')
    uuid = data.get('uuid')
    downloads = data.get('downloads')
    uploaded_at = data.get('uploaded_at')

    if not name:
        return jsonify({'error': 'Name is required for the template'}), 400
    
    template = Template(name=name, author=author, uuid=uuid, downloads=downloads, uploaded_at=uploaded_at)
    db.session.add(template)
    db.session.commit()

    template_data = {
        'id': template.id,
        'name': template.name,
        'author': template.author,
        'uuid': template.uuid,
        'downloads': template.downloads,
        'uploaded_at': template.uploaded_at
    }
    
    return jsonify({'message': 'Template created successfully', 'template': template_data}), 201

@app.route('/api/templates/<string:board_id>', methods=['POST'])
def upload_template_card(board_id):
    data = request.get_json()
    card_id = str(data.get('cardId'))
    card_name = data.get('cardName')
    upload_date = data.get('creationDate')
    order = data.get('order')
    column_name = data.get('column')
    details = data.get('details')

    template = Template.query.filter_by(uuid=board_id).first()
    if template:
        card = TemplateCard(uuid=card_id, card_name=card_name, upload_date=upload_date,
                    order=order, column_name=column_name, details=details, board_id=board_id)
        db.session.add(card)
        db.session.commit()
        return jsonify({'message': 'Template card added successfully'}), 201
    else:
        return jsonify({'error': 'Template not found'}), 404

@app.route('/api/templates/<board_id>', methods=['GET'])
def get_template_cards(board_id):
    template_cards = TemplateCard.query.filter_by(board_id=board_id).all()
    template_cards_list = []

    for card in template_cards:
        card_data = {
            'id': card.uuid,
            'cardName': card.card_name,
            'creationDate': card.upload_date,  
            'order': card.order,
            'column': card.column_name,
            'details': card.details
        }
        template_cards_list.append(card_data)

    return jsonify(template_cards_list)

@app.route('/api/templates', methods=['GET'])
def get_templates():
    user = request.args.get('user', 'all')

    if user == 'all':
        templates = Template.query.all()
    else:
        templates = Template.query.filter_by(author=user).all()

    templates_list = []

    for template in templates:
        template_data = {
            'uuid': template.uuid,
            'name': template.name,
            'author': template.author,
            'downloads': template.downloads,
            'uploaded_at': template.uploaded_at
        }
        templates_list.append(template_data)

    return jsonify(templates_list)
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

