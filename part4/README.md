# Welcome to the HBNB - Enhanced Backend with Authentication and Database Integration

## Presentation

HBnB is a RESTful API inspired by the AirBnB website, developed in Python using Flask and Flask-RESTX.  
The project follows a three-layer architecture (presentation, business logic, persistence) introduced in Part 1 of the HBnB project.

## Project Objectives

🔐 Authentication & Authorization:
Implement JWT-based authentication using Flask-JWT-Extended and role-based access control through the is_admin attribute.

🗃️ Persistent Data Storage:
Replace in-memory storage with SQLite for development, and prepare MySQL integration for production environments using SQLAlchemy as the ORM.

⚙️ Database-Backed CRUD Operations:
Refactor all Create, Read, Update, and Delete operations to interact with a relational database.

🧭 Database Modeling and Visualization:
Design the relational schema and visualize entity relationships (User, Place, Review, Amenity) using Mermaid.js.

✅ Data Validation & Consistency:
Enforce data validation and integrity constraints within the SQLAlchemy models.

## Technology Stack

Flask – Web framework for API development
Flask-JWT-Extended – JWT-based authentication
SQLAlchemy – ORM for database modeling
SQLite – Development database
MySQL – Target production database
Mermaid.js – ER diagram visualization tool

## Key Deliverables

A secure and scalable backend API with authentication and authorization.
A fully connected relational database schema using SQLAlchemy models.
Visualized database architecture with Mermaid.js diagrams.
Clear separation of concerns across routes, models, and controllers.

## How to Run the Application

1. Install dependencies using:  
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:  
   ```bash
   python3 run.py
   ```

3. To run the tests:  
   ```bash
   python3 run_tests.py
   ```

4. Leave the server:  
   Press `CTRL+C` to exit the server. When you launch the server, it should create an `instance` folder with the database file `development.db`.

5. Add the SQL script to the database:  
   ```bash
   sqlite3 instance/development.db < app/database/schema.sql
   ```

6. The application should now be running with the SQL script implemented. You can now launch the application and open your web browser, then go to http://127.0.0.1:5000/api/v1

---

## How to Run the Application with the communication front-end/back-end

1. run server back-end in the racine of the part4
	```bash
   python3 run.py
   ```

2. run server front-end int the repository base_files
	```bash
   python3 -m http.server 8000
   ```

3. Welcome to http://localhost:8000/index.html
	mdp administrator : admin1234
	mail administrator : admin@hbnb.io

## Purpose of Each Directory and File

![Structure du projet](structure.png)

app/                            # Contains the main application code
├── __init__.py                 # App constructor and factory function
├── api/                        # Contains API endpoints (by version)
│   ├── __init__.py             # API package initializer
│   └── v1/                     # Version 1 of the API endpoints
│       ├── __init__.py         # API v1 package initializer
│       ├── admin.py            # Admin-related API routes
│       ├── auth.py             # Auth-related API routes
│       ├── users.py            # User-related API routes
│       ├── places.py           # Place-related API routes
│       ├── reviews.py          # Review-related API routes
│       └── amenities.py        # Amenity-related API routes
├── database/                   # Database-related files
│   └── schema.sql              # SQL schema to initialize the database
├── models/                     # Business logic classes and ORM models
│   ├── __init__.py             # Models package initializer
│   ├── BaseModel.py            # Base model with shared attributes/methods
│   ├── association_tables.py   # Association tables for many-to-many relationships
│   ├── user.py                 # User model definition
│   ├── place.py                # Place model definition
│   ├── review.py               # Review model definition
│   └── amenity.py              # Amenity model definition
├── services/                   # Facade pattern for layer communication
│   ├── __init__.py             # Services package initializer
│   └── facade.py               # Facade class implementing business logic orchestration
├── persistence/                # In-memory repositories
│   ├── __init__.py             # Persistence package initializer
│   ├── repository.py           # Generic repository pattern implementation
│   └── user_repository.py      # User-specific repository implementation
├── tests/                      # Unit and integration tests and script test Postman
│   ├── script_postman.txt      # Postman test script for API endpoint testing
│   ├── test_amenities.py       # Unit tests for amenities
│   ├── test_places.py          # Unit tests for places
│   ├── test_reviews.py         # Unit tests for reviews
│   ├── test_users.py           # Unit tests for users
│   └── TEST.md                 # Documentation for the tests and testing procedure
instance/                       # Local instance folder, contains files specific to the machine
├── development.db              # SQLite database file created when running the app
base_files					    # Front-end code
├── images						# contains all image utilisated in the web site
├── index.html					# The main page html
├── login.html					# The page where the user have the possibility to connect
├── place.html					# The page where the place and the review of the place is display. Possibility to add a review
├── place.js					#
├── scripts.js
├── user.js
├── styles.css
__init__.py                     # Root package initializer
run.py                          # Entry point of the Flask app
config.py                       # Used to configure environment variables and application settings
requirements.txt                # Lists all Python packages required for the project
README.md                       # Project overview and documentation file
run-tests.py                    # Script to launch the test suite


## API Endpoints

User authentication via JWT tokens.
Restricted access to sensitive routes based on user roles (admin vs. regular user).
Passwords securely hashed using bcrypt.

| Method | Endpoint           | Description                   | Auth required |
|--------|--------------------|-------------------------------|---------------|
| POST   | /auth/register     | Register a new user           | ❌            |
| POST   | /auth/login        | Get JWT token                 | ❌            |
| GET    | /users             | List all users (admin only)   | ✅            |
| GET    | /places            | List all places               | ❌            |
| POST   | /places            | Create new place              | ✅            |
| PUT    | /reviews/<id>      | Update review                 | ✅            |
| DELETE | /amenities/<id>    | Delete an amenity (admin)     | ✅            |


## Database Diagram

```mermaid
erDiagram
    USERS {
        %% PK Primary Key
        CHAR(36) id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email
        VARCHAR password
        BOOLEAN is_admin
    }
    PLACES {
        CHAR(36) id PK
        VARCHAR title
        TEXT description
        DECIMAL price
        FLOAT latitude
        FLOAT longitude
        %% Foreign Key
        CHAR(36) owner_id FK
    }
    REVIEWS {
        CHAR(36) id PK
        TEXT text
        INT rating
        CHAR(36) user_id FK
        CHAR(36) place_id FK
    }
    AMENITIES {
        CHAR(36) id PK
        VARCHAR name
    }
    PLACE_AMENITY {
        CHAR(36) place_id FK
        CHAR(36) amenity_id FK
    }
    USERS ||--o{ PLACES : owns
    USERS ||--o{ REVIEWS : writes
    PLACES ||--o{ REVIEWS : receives
    PLACES ||--o{ PLACE_AMENITY : has
    %% Table d'association pour relation many-to-many entre Place et Amenity
    AMENITIES ||--o{ PLACE_AMENITY : linked_to
```

## Database Diagram with USER_PLACE_RESERVATION Integration

```mermaid
erDiagram
    USERS {
        %% PK Primary Key
        CHAR(36) id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email
        VARCHAR password
        BOOLEAN is_admin
    }
    PLACES {
        CHAR(36) id PK
        VARCHAR title
        TEXT description
        DECIMAL price
        FLOAT latitude
        FLOAT longitude
        %% Foreign Key
        CHAR(36) owner_id FK
    }
    REVIEWS {
        CHAR(36) id PK
        TEXT text
        INT rating
        CHAR(36) user_id FK
        CHAR(36) place_id FK
    }
    AMENITIES {
        CHAR(36) id PK
        VARCHAR name
    }
    PLACE_AMENITY {
        CHAR(36) place_id FK
        CHAR(36) amenity_id FK
    }
    USER_PLACE_RESERVATION {
        CHAR(36) place_id FK
        CHAR(36) user_id FK
        DATE start_date
        DATE end_date
    }
    USERS ||--o{ PLACES : owns
    USERS ||--o{ REVIEWS : writes
    PLACES ||--o{ REVIEWS : receives
    PLACES ||--o{ PLACE_AMENITY : has
    %% Table d'association pour relation many-to-many entre Place et Amenity
    AMENITIES ||--o{ PLACE_AMENITY : linked_to
    %% Table d'association pour relation many-to-many entre User et Place
    PLACES ||--o{ USER_PLACE_RESERVATION : booked_for
    USERS ||--o{ USER_PLACE_RESERVATION : makes
```

## Tests

All our tests were performed using Postman and Swagger, covering all CRUD operations.

## Author

👩‍💻 Robin David
🚀 Full-Stack Web Developer in training at Holberton School Laval — project-based and peer-learning curriculum
