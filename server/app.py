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


from openai import OpenAI
from googleapiclient.discovery import build
from youtubesearchpython import VideosSearch



load_dotenv()

app = Flask(__name__)
db_uri = f'{os.getenv("DB_URI")}'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config['SECRET_KEY'] = os.getenv("SECRET")
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

allowed_origins = ["http://localhost:5173", "https://studyflow.onrender.com", os.getenv('BACKEND_PRODUCTION')]
print('allowed origins', allowed_origins)
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
@jwt_required()
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
@jwt_required()
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
            'card_id': card.uuid,
            'card_name': card.card_name,
            'creation_date': card.upload_date,  
            'order': card.order,
            'column_name': card.column_name,
            'details': card.details
        }
        template_cards_list.append(card_data)

    return jsonify(template_cards_list)

@app.route('/api/templates', methods=['GET'])
@jwt_required()
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

@app.route('/api/templates/<template_id>', methods=['PUT'])
@jwt_required()
def edit_template(template_id):
    template = Template.query.filter_by(uuid=str(template_id)).first()
    if not template:
        return jsonify({'error': 'Template not found'}), 404

    data = request.json
    name = data.get('name')

    if name:
        if Template.query.filter(Template.uuid != str(template_id), Template.name == name).first():
            return jsonify({'error': 'Template name already exists'}), 400
        template.name = name
    db.session.commit()

    return jsonify({'message': 'Template updated successfully'}), 200

@app.route('/api/templates/<template_id>/increment_downloads', methods=['PUT'])
@jwt_required()
def increment_template_downloads(template_id):
    template = Template.query.filter_by(uuid=str(template_id)).first()
    if not template:
        return jsonify({'error': 'Template not found'}), 404

    template.downloads = (template.downloads or 0) + 1
    db.session.commit()

    return jsonify({'message': 'Downloads incremented successfully'}), 200


@app.route('/api/template_cards/<string:uuid>', methods=['PUT'])
@jwt_required()
def update_template_card(uuid):
    if request.method == 'PUT':
        data = request.get_json()
        card_name = data.get('cardName')
        order = data.get('order')
        column_name = data.get('column')
        details = data.get('details')
        card = TemplateCard.query.filter_by(uuid=uuid).first()
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

@app.route('/api/template_cards/<string:uuid>', methods=['DELETE'])
@jwt_required()
def delete_template_card(uuid):
    if request.method == 'DELETE':
        card = TemplateCard.query.filter_by(uuid=uuid).first()
        if card:
            db.session.delete(card)
            db.session.commit()
            return jsonify({'message': 'Card deleted successfully'}), 200
        else:
            return jsonify({'error': 'Card not found'}), 404
    else:
        return jsonify({'error': 'Only DELETE requests are allowed for this endpoint'}), 405


@app.route('/api/templates/<board_id>', methods=['DELETE'])
@jwt_required()
def delete_template(board_id):
    template = Template.query.filter_by(uuid=board_id).first()
    cards = TemplateCard.query.filter_by(board_id=board_id).all()
    if not template:
        return jsonify({'error': 'Template not found'}), 404
    try:
        for card in cards:
            db.session.delete(card)
        db.session.delete(template)
        db.session.commit()
        return jsonify({'message': 'Template and associated cards deleted successfully'}), 200

    except Exception as e:
        db.session.rollback() 
        print(e)
        return jsonify({'error': 'Failed to delete template and associated cards'}), 500


import re

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# breaks down prompt into subtopics. will create number of subtopics based on chosen in-depth level
@app.route('/api/subtopics', methods=['POST'])
def create_subtopics():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        if not data:
            print("No data received")
            return jsonify({"error": "No data received"}), 400

        text = data.get('text')
        num_subtopics = data.get('num_subtopics', 5)
        existing_subtopics = data.get('existing_subtopics')  # Check for existing subtopics list

        if not text:
            print("No text provided")
            return jsonify({"error": "No text provided"}), 400

        print(f"Text: {text}, Num Subtopics: {num_subtopics}, Existing Subtopics: {existing_subtopics}")

        complexity = "comprehensive analysis" if num_subtopics == "a lot" else "solid understanding" if num_subtopics == "some" else "brief overview"

        if existing_subtopics:
            existing_subtopics_str = ", ".join(
                [f'"{subtopic}"' for subtopic in existing_subtopics]
            )
            prompt = f"""You already have the following subtopic titles: [{existing_subtopics_str}]. 
            Please build on these by adding exactly 3 new distinct subtopics related to '{text}'.
            The goal for these subtopics is to provide a comprehensive overview of the main topic. 
            Each new subtopic should include a name and a short summary. 
            The subtopic name should be a few words long and be specific to the context of what the topic is about. Avoid generic names.
            Ensure the response is formatted as valid JSON. Only return the updated topics, not the original ones.
            The JSON must be in this format: {{"subtopics": [{{"name": "Subtopic 1", "summary": "This is the summary of subtopic 1."}}...]}}.  
            Also, generate a title that is exactly no more than 3 words based on the overall content that can be used as a board name, 
            this should be a similar style to what a college course might be named without the numbers. 
            This title should be included in the JSON response as a separate field 'boardName'. 
            Avoid using any single quotes (') or double quotes (") within the text content. 
            Instead, rephrase the text to exclude these characters."""
        else:

            prompt = f"""Please break down the topic '{text}' into '{num_subtopics}' distinct subtopics in order to give a '{complexity}' of the topic. 
            Each subtopic should include a name and a short summary. 
            The subtopic name should be a few words long and be specific to the context of what the topic is about. Avoid generic names.
            The goal for these subtopics is to provide a comprehensive overview of the main topic. 
            Please ensure the response is formatted as valid JSON. 
            The JSON must be in this format: {{"subtopics": [{{"name": "Subtopic 1", "summary": "This is the summary of subtopic 1."}}...]}}.  
            Also, generate a title that is exactly no more than 3 words based on the overall content that can be used as a board name, 
            this should be a similar style to what a college course might be named without the numbers. 
            This title should be included in the JSON response as a separate field 'boardName'. 
            Avoid using any single quotes (') or double quotes (") within the text content. 
            Instead, rephrase the text to exclude these characters."""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert on creating personalized study tracks designed to output valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object"}
        )

        # Access the content correctly
        message_content = response.choices[0].message.content.strip()
        print(f"Raw API Response: {message_content}")

        # Remove any code block delimiters
        if message_content.startswith("```json"):
            message_content = message_content[7:]
        if message_content.endswith("```"):
            message_content = message_content[:-3]

        # Remove trailing commas before closing braces/brackets
        message_content = re.sub(r',\s*(\]|\})', r'\1', message_content)

        try:
            subtopics_json = json.loads(message_content)
        except json.JSONDecodeError as e:

            error_position = e.pos
            line_number = message_content.count('\n', 0, error_position) + 1
            error_line = message_content.splitlines()[line_number - 1]
            print(f"JSON parsing error: {str(e)}")
            print(f"Error occurred at line {line_number}: {error_line}")
            return jsonify({"error": "Invalid JSON response from API.", "line": line_number, "context": error_line}), 500

        return jsonify(subtopics_json)

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500


# break subtopic into further details. Will always create 4 "details" for each subtopic
@app.route('/api/details', methods=['POST'])
def get_subtopic_details():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        if not data:
            print("No data received")
            return jsonify({"error": "No data received"}), 400

        subtopic = data.get('subtopic')
        existing_sub_subtopics = data.get('existing_sub_subtopics') 

        if not subtopic:
            print("No subtopic provided")
            return jsonify({"error": "No subtopic provided"}), 400

        print(f"Subtopic: {subtopic}, Existing Sub-Subtopics: {existing_sub_subtopics}")

        if existing_sub_subtopics:
            existing_sub_subtopics_str = ", ".join(
                [f'"{detail}"' for detail in existing_sub_subtopics]
            )
            prompt = f"""You already have the following sub-subtopic titles: [{existing_sub_subtopics_str}]. 
            Please add 2 new distinct sub-subtopics related to '{subtopic}'. 
            Each new sub-subtopic should include a name, a short summary, and a format (either 'article' or 'video'). 
            The sub-subtopic name should be a few words long and be specific to the context of what the subtopic is about. Avoid generic names.
            For the 'format' part of the JSON, evaluate whether the sub-subtopic is more practical (e.g., coding tutorials, hands-on exercises) 
            or conceptual (e.g., history, theory). Assign 'video' to practical hands-on topics and 'article' to conceptual theoretical topics. 
            Ensure that roughly 60-70% of the sub-subtopics use 'video' and the remaining 30-40% use 'article'. 
            Distribute these formats within the sub-subtopics so they don't follow a fixed pattern. 
            Only return the two new sub-subtopics, not the original ones.
            Please ensure the response is formatted as valid JSON. 
            The JSON must be in this format: {{"sub_subtopics": [{{"name": "Sub-subtopic 1.1 name", "summary": "This is the summary of sub-subtopic 1.1.", "format": "article / video"}},...]}}. 
            Avoid using any single quotes (') or double quotes (") within the text content. 
            Instead, rephrase the text to exclude these characters."""
        else:
            prompt = f"""Please break down the subtopic '{subtopic}' into 4 distinct sub-subtopics. 
            Each sub-subtopic should include a name, a short summary, and a format (either 'article' or 'video'). 
            The sub-subtopic name should be a few words long and be specific to the context of what the subtopic is about. Avoid generic names.
            For the 'format' part of the JSON, evaluate whether the sub-subtopic is more practical (e.g., coding tutorials, hands-on exercises) 
            or conceptual (e.g., history, theory). Assign 'video' to practical hands-on topics and 'article' to conceptual theoretical topics. 
            Ensure that roughly 60-70% of the sub-subtopics use 'video' and the remaining 30-40% use 'article'. 
            Distribute these formats within the sub-subtopics so they don't follow a fixed pattern. 
            Please ensure the response is formatted as valid JSON. 
            The JSON must be in this format: {{"sub_subtopics": [{{"name": "Sub-subtopic 1.1 name", "summary": "This is the summary of sub-subtopic 1.1.", "format": "article / video"}},...]}}. 
            Avoid using any single quotes (') or double quotes (") within the text content. 
            Instead, rephrase the text to exclude these characters."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert on creating detailed educational content designed to output valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object"}
        )

        message_content = response.choices[0].message.content.strip()
        print(f"Raw API Response: {message_content}")

        # remove any code block delimiters
        if message_content.startswith("```json"):
            message_content = message_content[7:]
        if message_content.endswith("```"):
            message_content = message_content[:-3]

        # remove trailing commas before closing braces/brackets
        message_content = re.sub(r',\s*(\]|\})', r'\1', message_content)

        try:
            sub_subtopics_json = json.loads(message_content)
        except json.JSONDecodeError as e:
            # debugging stuff
            error_position = e.pos
            line_number = message_content.count('\n', 0, error_position) + 1
            error_line = message_content.splitlines()[line_number - 1]
            print(f"JSON parsing error: {str(e)}")
            print(f"Error occurred at line {line_number}: {error_line}")
            return jsonify({"error": "Invalid JSON response from API.", "line": line_number, "context": error_line}), 500

        return jsonify(sub_subtopics_json)

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500




# Old route not sure if we will end up using this. 
# This is used to update previous instructions given. 
# There's a commented out function for this in client/Generate.tsx
@app.route('/api/refine', methods=['POST'])
def refine_subtopics():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        if not data:
            print("No data received")
            return jsonify({"error": "No data received"}), 400

        original_topic = data.get('original_topic')
        num_subtopics = data.get('num_subtopics', 5)
        instructions = data.get('instructions')

        if not instructions:
            print("No instructions provided")
            return jsonify({"error": "No instructions provided"}), 400

        print(f"Instructions: {instructions}")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert on learning and JSON manipulation. You will refine and update an existing JSON structure based on the instructions provided."
                },
                {
                    "role": "user",
                    "content": f"""Please break down the topic '{original_topic}' into exactly {num_subtopics} distinct subtopics. Make sure you are following the refined instructions: {instructions}. Each subtopic should include a name and a short summary. Additionally, break each subtopic into 4 sub-subtopics, each with its own name and short summary. Please ensure the response is formatted as valid JSON. The JSON must be in this format: {{"subtopics": [{{"name": "Subtopic 1", "summary": "This is the summary of subtopic 1.", "sub_subtopics": [{{"name": "Sub-subtopic 1.1 name", "summary": "This is the summary of sub-subtopic 1.1.", "format": "article / video"}},{{"name": "Sub-subtopic 1.2 name", "summary": "This is the summary of sub-subtopic 1.2.", "format": "article / video"}},{{"name": "Sub-subtopic 1.3 name", "summary": "This is the summary of sub-subtopic 1.3.", "format": "article / video"}},{{"name": "Sub-subtopic 1.4 name", "summary": "This is the summary of sub-subtopic 1.4.", "format": "article / video"}}]}},...]}}. For the "format" part of the JSON, evaluate whether the topic is more practical (e.g., coding tutorials, hands-on exercises) or conceptual (e.g., history, theory). Assign "video" to practical hands-on topics and "article" to conceptual theoretical topics. Ensure that roughly 60-70% of the sub-subtopics use "video" and the remaining 30-40% use "article". Distribute these formats within each subtopic so they don't follow a fixed pattern. Avoid using any single quotes (') or double quotes (") within the text content. Instead, rephrase the text to exclude these characters."""
                }
            ],
            response_format={"type": "json_object"}
        )

        message_content = response.choices[0].message.content.strip()
        print(f"Raw API Response: {message_content}")

        # remove  code block delimiters
        if message_content.startswith("```json"):
            message_content = message_content[7:]
        if message_content.endswith("```"):
            message_content = message_content[:-3]

        # remove trailing commas before closing braces/brackets
        message_content = re.sub(r',\s*(\]|\})', r'\1', message_content)

        try:
            refined_json = json.loads(message_content)
        except json.JSONDecodeError as e:
            # debugging stuff
            error_position = e.pos
            line_number = message_content.count('\n', 0, error_position) + 1
            error_line = message_content.splitlines()[line_number - 1]
            print(f"JSON parsing error: {str(e)}")
            print(f"Error occurred at line {line_number}: {error_line}")
            return jsonify({"error": "Invalid JSON response from API.", "line": line_number, "context": error_line}), 500

        return jsonify(refined_json)

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/links', methods=['POST'])
def get_links():
    data = request.get_json()
    topics = data.get('topics', [])

    if not topics:
        return jsonify({"error": "No topics provided"}), 400

    resources = []

    for entry in topics:
        topic = entry.get('topic')
        format_type = entry.get('format', 'video')

        if format_type == 'video':
            resource = get_youtube_tutorial(topic)
        elif format_type == 'article':
            resource = get_bing_article(topic)
        else:
            resource = {'topic': topic, 'error': 'Invalid format type'}

        resources.append(resource)

    return jsonify(resources)


def get_youtube_tutorial(topic):
    query = f"{topic} tutorial"
    videosSearch = VideosSearch(query, limit=1)
    result = videosSearch.result()

    if result['result']:
        video = result['result'][0]
        duration_parts = video['duration'].split(':')
        if len(duration_parts) == 3:
            duration = int(duration_parts[0]) * 60 + int(duration_parts[1])
        else:
            duration = int(duration_parts[0])

        return {
            'topic': topic,
            'video_url': video['link'],
            'title': video['title'],
            'description': video['descriptionSnippet'][0]['text'] if video['descriptionSnippet'] else 'No description available',
            'duration': duration
        }
    else:
        return {
            'topic': topic,
            'video_url': None,
            'title': None,
            'description': "No video found for this topic.",
            'duration': None
        }



bing_key = os.getenv("BING_KEY")

def get_bing_article(topic):
    query = f"{topic} tutorial"
    subscription_key = bing_key
    search_url = "https://api.bing.microsoft.com/v7.0/search"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}
    params = {"q": query, "textDecorations": True, "textFormat": "HTML"}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()

    if search_results.get('webPages', {}).get('value', []):
        item = search_results['webPages']['value'][0]
        return {
            'topic': topic,
            'article_url': item['url'],
            'title': item['name'],
            'snippet': item['snippet'],
            'duration': 10
        }
    else:
        return {
            'topic': topic,
            'article_url': None,
            'title': None,
            'snippet': "No article found for this topic."
        }

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


