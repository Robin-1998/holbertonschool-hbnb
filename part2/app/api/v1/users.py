"""
User management module (users) via a RESTful API.

This module defines a Flask-RESTx namespace dedicated to user-related operations,
with endpoints to create, retrieve, and update users registered in the application.

Main functionalities:
- POST /users/               : Create a new user.
- GET /users/                : Retrieve the list of all users.
- GET /users/<user_id>       : Retrieve a user by their ID.
- PUT /users/<user_id>       : Update user information.

Each endpoint uses Flask-RESTx models for input validation and 
API documentation via Swagger.

Operations rely on the 'facade' service to handle business logic
and data access, including checking for email uniqueness.

HTTP status codes used:
- 200 : Successful operation.
- 201 : Resource successfully created.
- 400 : Invalid data or email already registered.
- 404 : User not found.

This module enforces strict input validation 
(first name, last name, email) and provides interactive documentation via Swagger UI.
"""


from flask import request
from flask_restx import Namespace, Resource, fields
from app.services import facade

# Namespace : permet de créer des groupe logique d'url et de ressources pour API
# Ressource : Classe de base pour définir les point de terminaison (endpoints) d'une API REST
# Fields :Sert à donner les modèles données pour la validation et la doc Swagger


# crée un sous-ensemble d'URL, ici pour les utilisateur (/users)
# Swagger générera une sectoin"user operations"
api = Namespace('users', description='User operations')

# Définir le modèle utilisateur pour la validation et la documentation des entrées
# api.model: défini un schéma JSON pour les entrées utilisateur (Swagger)
# chaque champ est requis puisque required=True, etdoit avoir une descritpion
user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user')
})


@api.route('/')
# Déclare une 'ressource' (hérite de Ressource) attaché à la route /users/
# gère les requêtes HTTP POST
class UserList(Resource):
    # @api.expect :indique que la requête doit contenir un JSON conforme à 'user_model'
    @api.expect(user_model, validate=True)  # Active la validation automatique,
    # @api.response : Spécifie les réponses possibles pour Swagger
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new user"""
        # api.payload : Récupère le corps JSONde la requête sous forme de dico
        user_data = api.payload

        # Simuler la vérification de l'unicité des e-mails (à remplacer par une véritable validation avec persistance)
        # Appelle 'facade.get_user_by_email()' pour vérifier si l'email est déjà utilisé
        # si oui, retourne une erreur 400 avec message explicite
        existing_user = facade.get_user_by_email(user_data['email'])
        if existing_user:
            return {'error': 'Email already registered'}, 400
        # Appelle 'facade.create_user()' pour enregistrer le nouvel utilisateur en base
        try:
            new_user = facade.create_user(user_data)
        except ValueError as error :
            return {'error': str(error)}, 400
        # Retourne les info du nouvel utilisateur avec un code 201 ("created")
        return {'id': new_user.id, 'first_name': new_user.first_name, 'last_name': new_user.last_name, 'email': new_user.email}, 201

        # Résumé du code :
        # Valide automatiquement les données avec le modèleSwagger
        # Vérifie si l'email est déjà utilisé
        # Créer l'utilisateur si tout es OK
        # Fournit une doc interactive avec SwaggerUI

        # Le code suivant définti un endpoint GET
        # pour récupérer les infos d'un utilisateur à partir de son ID

    @api.response(200, 'List user print')
    @api.response(404, 'User not found')
    def get(self):
        """ return the lists of users """
        users = facade.get_all()
        return users, 200


@api.route('/<user_id>', methods=['GET', 'PUT'])
# créer une route de type /users/12345 par exemple, <user_id est une valeur dynamique extraite directement de l'URL
# la classe 'UserRessosurce' est lié à cette route et va gérer les requêtes comme GET, PUT, DELETE
class UserResource(Resource):
    # Pour Swagger, cela indique les codes de réponses possible.
    @api.response(200, 'User details retrieved successfully')
    @api.response(400, 'Invalid input data')
    @api.response(404, 'User not found')
    # Cette méthode s'éxecute quand une requête GET est faite sur /users/<user_id>
    # user_id est automatiquement passé en argument, récpéré par l'URL
    def get(self, user_id):
        """Get user details by ID"""
        # Appelle la méthode get_user du module facade, en lui passant l'ID demandé
        # cette fonction interroge la base de données ou la couche métier pour trouveerl'utilisateur correspondant
        user = facade.get_user(user_id)
        # Si l'utilisateur n'xiste pas (None ou équivalent) l'API retourne message d'erreur et code
        if not user:
            return {'error': 'User not found'}, 404
        return {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }, 200
        # si utilisateur est trouvé, l'API retoiurne ses données dans un dico JSON avec code

    def put(self, user_id):
        data = request.json
        # le serveur reçoit la requêteet le coprs de la requête contient des
        # données au format JSON
        # parsing automatique du corps de la requête pour obtenir un dictionnaire Python (ou objet) correspondant au JSON envoyé.
        if not data:
            return {"error": "Data not found"}, 400
        try:
            user = facade.update_user(user_id, data)
        except ValueError as error:
            return {'error': str(error)}, 400
        if user:
            return {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }, 200
        else:
            return {"error": "User don't exist"}, 404
