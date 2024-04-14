# Travel Diary Platform Backend API

Welcome to the Travel Diary Platform Backend API. This API allows users to create, read, update, and delete travel diary entries. It is built using `Node.js` and `Express.js`, with a `SQLite` database for data storage. The project also demonstrates the application of `Object-Oriented Programming (OOP)` concepts to encapsulate functionality within classes.

## Prerequisites:

### Node.js and npm: 

Ensure that you have Node.js installed on your local system. You can download and install Node.js from the official website.

### SQLite: 

Install SQLite on your system. SQLite is a self-contained, serverless, zero-configuration, transactional SQL database engine. You can download SQLite from the official website.

### Git: 

If you plan to clone the repository from a version control system, make sure you have Git installed on your system. You can download Git from the official website.

## Setup Instructions

1. **Clone the repository:**

    ```git clone "https://github.com/vundelavamsi/travel-diary-platform"```

2. **Install dependencies:**

    ```npm install```

3. **Create SQLite database:**

    Ensure you have SQLite installed on your system. Then, run the following command to create the database file in your terminal:

    ```mkdir travel_diary.db```

4. **Run the server:**

    ```npm start```

# API Endpoints

## User - Endpoints

### User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "example",
        "password": "password"
    }
    ```
- **Response:**

    - ```201 Created``` on successful registration
    - ```500 Internal Server Error``` on failure

- **Example:**

    ```json
        POST http://localhost:3000/register
        Content-Type: application/json

        {
            "username": "example",
            "password": "pasword"
        }
    ```

### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "example",
        "password": "password"
    }
    ```
- **Response:**

    - ```200 Ok``` with JWT token on successful login
    - ```500 Internal Server Error``` on failure

- **Example:**

    ```json
        POST http://localhost:3000/login
        Content-Type: application/json

        {
            "username": "example",
            "password": "pasword"
        }
    ```

## Diary Entry - Endpoints

### Diary Entry Creation

- **Endpoint:** `/diary`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "user_id": 1,
        "title": "Trip to Paris",
        "description": "Visited Eiffel Tower and Louvre Museum",
        "date": "2024-04-01",
        "location": "Paris, France",
        "photos": "eiffel_tower.jpg"
    }
    ```
- **Response:**

    - ```201 Created``` on successful creation
    - ```500 Internal Server Error``` on failure

- **Example:**

    ```json
        POST http://localhost:3000/diary
        Content-Type: application/json

        {
            "userId": 2,
            "title": "My first diary entry",
            "description": "This is my first diary entry",
            "date": "2021-01-01",
            "location": "Hyderabad",
            "photos": "charminar.png"
        }
    ```

### Diary Entry Update

- **Endpoint:** `/diary/:id`
- **Method:** `PUT`
- **Request Parameters:**
    - `id`: ID of the diary entry to update
- **Request Body:**
    ```json
    {
        "title": "Updated Title",
        "description": "Updated Description",
        "date": "2024-04-02",
        "location": "New York, USA",
        "photos": "new_photo.jpg"
    }
    ```
- **Response:**

    - ```200 OK``` on successful update
    - ```500 Internal Server Error``` on failure

- **Example:**

    ```json
        PUT http://localhost:3000/diary/5
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzA3MTA0OX0.3FOEtXFUnooGxUwFJ8vINnS3bKLkD-XRLUVOQA9pwPU
        Content-Type: application/json
        {
            "title": "My first diary entry",
            "description": "This is my first diary entry in this trip",
            "date": "2021-01-01",
            "location": "Hyderabad",
            "photos": "charminar.png"
        }
    ```

### Diary Entry Deletion

- **Endpoint:** `/diary/:id`
- **Method:** `DELETE`
- **Request Parameters:**
    - `id`: ID of the diary entry to delete
- **Response:**

    - ```200 OK``` on successful deletion
    - ```500 Internal Server Error``` on failure

- **Example:**

    ```json
        DELETE http://localhost:3000/diary/5
    ```

# Application of OOP Concepts

## Encapsulation: 
 - Functionality related to user management and diary entries is encapsulated within the User and DiaryEntry classes, respectively. These classes encapsulate data and methods related to their respective entities.

## Abstraction: 
 - Users of the API interact with the User and DiaryEntry classes through well-defined methods without needing to know the internal details of their implementation.

## Modularity: 
 - The code is structured into separate modules for different functionalities (user.js, diaryEntry.js). Each module is responsible for a specific aspect of the application, promoting modularity and ease of maintenance.

## Reusability: 
 - By encapsulating functionality within classes, code can be reused across different parts of the application. For example, the User class can be reused for authentication in other parts of the application.

## Ease of Maintenance: 
 - OOP principles make the codebase easier to understand, maintain, and extend. Changes to one part of the code are less likely to impact other parts, leading to better maintainability.


# Contact Information

For any queries or assistance, feel free to contact:
 - Name: Vundela Vamsi
 - Email: vr313009@gmail.com
