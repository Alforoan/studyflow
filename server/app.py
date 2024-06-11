from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost:5432/flaskdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Board(db.Model):
    __tablename__ = 'boards'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)




@app.get('/')
def home():
  return 'Hello df'

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
