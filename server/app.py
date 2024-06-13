from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost:5432/flaskdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = SQLAlchemy(app)

class Board(db.Model):
    __tablename__ = 'boards'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)




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
        name = data.get('name')
        if name:
            board = Board(name=name)
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
        boards = Board.query.all()
        board_list = [{'id': board.id, 'name': board.name} for board in boards]
        return jsonify(board_list), 200
    else:
        return jsonify({'error': 'Only GET requests are allowed for this endpoint'}), 405


