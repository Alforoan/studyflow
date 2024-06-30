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
from models import User, Board, Card

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

  
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

