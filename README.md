# Notes App

This is a full-stack notes app. You can sign up, log in, and save your notes. I made the backend with Node.js and MongoDB. The frontend is plain HTML, CSS, and JavaScript.

## Features

- Sign up with a name, email, and password
- Log in and get a login token
- Add notes with a title and text
- Edit your notes
- Delete your notes with a confirm box
- You only see your own notes. Every note belongs to the logged in user
- Protected routes. You need a valid token to read or change notes
- Logout button that clears the token

## Tech stack

Backend:
- Node.js
- Express
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for login tokens
- dotenv for environment variables
- cors

Frontend:
- Plain HTML, CSS, and JavaScript with the fetch API
- Bootstrap 5 for styling

## How to run

You need Node.js and a MongoDB database. You can use the free MongoDB Atlas.

1. Set up the backend:

```
cd backend
cp .env.example .env
```

Open `.env` and fill in your own values:

- `MONGO_URI` - your MongoDB connection string
- `JWT_SECRET` - a long random string used to sign tokens
- `PORT` - optional, the default is 5000

Then start the server:

```
npm start
```

You should see "Server running on port 5000" and "MongoDB connected".

2. Open the frontend:

Open `frontend/index.html` in your browser. The frontend calls the backend at `http://localhost:5000`, so make sure the backend runs on port 5000.

Important: never commit your real `.env` file. Keep your secrets in `.env` only. The file `backend/.gitignore` already ignores it, so git will not track it.

## API routes

- POST /api/auth/register - create a new account
- POST /api/auth/login - log in and get a token
- GET /api/notes - get your notes (needs token)
- POST /api/notes/add - add a note (needs token)
- PUT /api/notes/:id - update your note (needs token)
- DELETE /api/notes/:id - delete your note (needs token)

## Project structure

```
backend/
  server.js       - starts the app and connects to MongoDB
  controllers/    - the auth and notes logic
  models/         - the User and Note schemas
  routes/         - the /api/auth and /api/notes routes
  middleware/     - checks the login token
  .env.example    - example of the values you need in .env
frontend/
  index.html      - the login and register page
  notes.html      - the notes page
  js/main.js      - calls the backend API
  css/style.css   - small extra styles
```

## Author

Noman Javed
