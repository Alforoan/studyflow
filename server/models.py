from app import db

class Board(db.Model):
    __tablename__ = 'boards'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    uuid = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    boards = db.relationship('Board', backref='user', lazy=True)

class Card(db.Model):
    __tablename__ = 'cards'
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.String(80), unique=True, nullable=False)
    card_name = db.Column(db.String(80), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    column_name = db.Column(db.String(80), nullable=False)
    details = db.Column(db.JSON, nullable=False)
    board_id = db.Column(db.String(80), db.ForeignKey('boards.uuid', ondelete='CASCADE'), nullable=False)