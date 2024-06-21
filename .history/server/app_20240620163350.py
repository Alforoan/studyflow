from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

db_uri = f'postgresql://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@localhost:5432/{os.getenv("DB_NAME")}'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:newMe116$@localhost:5432/flaskdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = SQLAlchemy(app)


@app.get('/')
def home():
  return 'Hello df'

@app.route('/api/signin', methods=['POST'])
def sign_in_or_create_user():
    if request.method == 'POST':
        data = request.json
        print('DATA FROM FRONTEND',data)
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'Sign in successful'}), 200
        else:
            user = User(email=email)
            db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards', methods=['POST'])
def create_board():
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        name = data.get('name')
        user = User.query.filter_by(email=email).first()
        name_exists = Board.query.filter_by(name=name).first()
        user_id = user.id
        if name_exists:
            return jsonify({'error': 'Board name already exists'}), 400
        if user:
            board = Board(name=name, user_id=user_id)
            db.session.add(board)
            db.session.commit()
            return jsonify({'message': 'Board created successfully'}), 201
        else:
            return jsonify({'error': 'Name is required for creating a board'}), 400
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards', methods=['GET'])
def get_all_boards():
    if request.method == 'GET':
        email = request.args.get('email')
        user = User.query.filter_by(email=email).first()
        user_id = user.id
        boards = Board.query.filter_by(user_id=user_id).all()
        board_list = [{'id': board.id, 'name': board.name} for board in boards]
        return jsonify(board_list), 200
    else:
        return jsonify({'error': 'Only GET requests are allowed for this endpoint'}), 405

@app.route('/api/boards/<int:board_id>', methods=['PUT'])
def edit_board(board_id):
    board = Board.query.get(board_id)
    if not board:
        return jsonify({'error': 'Board not found'}), 404

    data = request.json
    name = data.get('name')

    if name:
        if Board.query.filter(Board.id != board_id, Board.name == name).first():
            return jsonify({'error': 'Board name already exists'}), 400
        board.name = name
    db.session.commit()

    return jsonify({'message': 'Board updated successfully'}), 200


@app.route('/api/boards/<int:board_id>', methods=['POST'])
def add_card_to_board(board_id):
    if request.method == 'POST':
        data = request.get_json()
        card_id = data.get('cardId')
        card_name = data.get('cardName')
        creation_date = data.get('creationDate')
        order = data.get('order')
        column = data.get('column')
        details = data.get('details')

        board = Board.query.get(board_id)
        if board:
            card = Card(card_id=card_id, card_name=card_name, creation_date=creation_date,
                        order=order, column=column, details=details, board=board)
            db.session.add(card)
            db.session.commit()
            return jsonify({'message': 'Card added successfully'}), 201
        else:
            return jsonify({'error': 'Board not found'}), 404
    else:
        return jsonify({'error': 'Only POST requests are allowed for this endpoint'}), 405

@app.route('/api/boards/<int:board_id>', methods=['GET'])
def get_cards_for_board(board_id):
    if request.method == 'GET':
        board = Board.query.get(board_id)
        if board:
            cards = [{'cardId': card.card_id, 'cardName': card.card_name, 'creationDate': card.creation_date,
                      'order': card.order, 'column': card.column, 'details': card.details} for card in board.cards]
            return jsonify(cards), 200
        else:
            return jsonify({'error': 'Board not found'}), 404
    else:
        return jsonify({'error': 'Only GET requests are allowed for this endpoint'}), 405

@app.route('/api/cards/<string:card_id>', methods=['PUT'])
def update_card(card_id):
    if request.method == 'PUT':
        data = request.get_json()
        card_name = data.get('cardName')
        order = data.get('order')
        column = data.get('column')
        details = data.get('details')

        card = Card.query.filter_by(card_id=card_id).first()
        if card:
            card.card_name = card_name
            card.order = order
            card.column = column
            card.details = details
            db.session.commit()
            return jsonify({'message': 'Card updated successfully'}), 200
        else:
            return jsonify({'error': 'Card not found'}), 404
    else:
        return jsonify({'error': 'Only PUT requests are allowed for this endpoint'}), 405

@app.route('/api/cards/<string:card_id>', methods=['DELETE'])
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

from models import User, Board, Card