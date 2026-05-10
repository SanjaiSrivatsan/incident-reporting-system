# Full Stack Deployment Guide: Incident Reporting System

This guide provides step-by-step instructions to deploy the Incident Reporting Management System using modern hosting platforms.

- **Database**: MongoDB Atlas
- **Backend**: Render
- **Frontend**: Vercel

---

## Example GitHub Repo Structure
A monorepo structure is recommended. You should initialize a git repository in the root project folder:

```text
incident-reporting-system/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── seed.js
│   ├── server.js
│   └── README.md
│
│── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── .gitignore
```
*(Make sure to add `.env` and `node_modules` to your `.gitignore` files in both backend and frontend directories!)*

---

## 1. MongoDB Atlas Setup

1. **Create an Account:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. **Build a Cluster:** Choose the free **M0 Sandbox** cluster.
3. **Database Access:** 
   - Go to "Database Access" on the left sidebar.
   - Click "Add New Database User".
   - Set an authentication method (Password). Note down the username and password.
4. **Network Access:**
   - Go to "Network Access" on the left sidebar.
   - Click "Add IP Address" -> choose "Allow Access From Anywhere" (`0.0.0.0/0`).
5. **Get Connection String:**
   - Go back to "Database" -> "Clusters".
   - Click "Connect" -> "Drivers".
   - Copy the connection string. It will look like this:
     `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
   - *Replace `<username>` and `<password>` with your Database User credentials. Add your database name before the `?` (e.g., `...net/incident_db?...`).*

---

## 2. Generating a JWT Secret
You need a secure random string for JWT token generation. 
You can generate one easily using Node.js:
1. Open your terminal.
2. Run `node` to enter the Node REPL.
3. Type: `require('crypto').randomBytes(64).toString('hex')`
4. Press Enter. Copy the output string. This is your `JWT_SECRET`.

---

## 3. Backend Deployment (Render)

1. Go to [Render](https://render.com/) and connect your GitHub account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository containing the backend code.
4. Set the following configuration:
   - **Root Directory**: `backend` (if using the monorepo structure above)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server.js`)
5. **Environment Variables**:
   Click "Advanced" and add the following variables:
   - `PORT` = `10000` (Render defaults to this)
   - `MONGO_URI` = `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET` = `<Your Generated JWT Secret>`
6. Click **Create Web Service**. Wait for the build to finish.
7. **Important**: Make sure your `server.js` has CORS configured correctly (`app.use(cors())`), which we have already done!

### Seeding the Database in Production
1. Go to your Render Web Service dashboard.
2. Click on the **Shell** tab (this connects you directly to your server instance).
3. Run the following command inside the shell:
   ```bash
   npm run seed
   ```
4. It should print `Data seeded successfully!`.

---

## 4. Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/) and connect your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Set the following configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. **Environment Variables**:
   Expand "Environment Variables" and add:
   - Name: `VITE_API_URL`
   - Value: `<Your Render Backend URL>/api` (e.g., `https://incident-backend-xyz.onrender.com/api`)
6. Click **Deploy**. Vercel will build and host your frontend.

---

## 5. Testing the Live Deployment

1. Visit your Vercel URL (e.g., `https://incident-frontend-xyz.vercel.app`).
2. Log in using the seeded test credentials:

### Demo Login Credentials
- **Reporter**
  - Email: `reporter@example.com`
  - Password: `password123`
- **Resolver**
  - Email: `resolver@example.com`
  - Password: `password123`

3. Create a new incident as the Reporter.
4. Log out, then log in as the Resolver.
5. Attempt to update the status and priority. Verify that priority downgrades (e.g., HIGH to LOW) are rejected and show an error message.

---

## Sample README.md for Backend

```markdown
# Incident Reporting Backend API

Production-ready backend for the Incident Reporting System.

## Features
- JWT Authentication & Role-based Access Control
- MongoDB Atlas integration
- Strict business logic for incident priorities

## Environment Variables
Required environment variables for deployment:
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT hashing.
- `PORT`: Server port (optional, defaults to 5000).

## Local Setup
1. `npm install`
2. Create `.env` file and populate variables.
3. `npm run seed` to insert initial demo data.
4. `npm run dev` to start server locally.

## Deployment on Render
Set root directory to `backend`, Build command to `npm install`, Start command to `node server.js`. Add environment variables in the Render dashboard.
```

## Sample README.md for Frontend

```markdown
# Incident Reporting Frontend (React + Vite)

The UI for the Incident Reporting System, strictly communicating with the backend API.

## Environment Variables
- `VITE_API_URL`: The full backend API URL (e.g., `https://backend-url.onrender.com/api`).

## Local Setup
1. `npm install`
2. Create a `.env` file with `VITE_API_URL=http://localhost:5000/api`.
3. `npm run dev` to start the frontend.

## Deployment on Vercel
Set the root directory to `frontend`, ensure Framework Preset is Vite, and add `VITE_API_URL` in the Vercel dashboard environment variables before deploying.
```
