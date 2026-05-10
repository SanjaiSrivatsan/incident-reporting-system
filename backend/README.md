# Incident Reporting Management System

A Node.js/Express backend for managing incident reports with role-based access control.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- CORS

## Roles & Permissions
- **REPORTER**: Can create incidents and view their own incidents.
- **RESOLVER**: Can view all incidents and update their status/priority (but cannot downgrade priority).

## Priorities
LOW, MEDIUM, HIGH, CRITICAL. Priority cannot be downgraded once set.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on \`mongodb://localhost:27017\`

## Setup Instructions

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
2. **Configure Environment Variables**:
   Create a \`.env\` file in the root directory with the following structure (or copy \`.env.example\`):
   \`\`\`env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/incident_db
   JWT_SECRET=your_super_secret_jwt_key_here
   \`\`\`
3. **Seed the database**:
   This will create a Reporter, a Resolver, and 2 sample incidents.
   \`\`\`bash
   npm run seed
   \`\`\`
4. **Run the application**:
   - For development: \`npm run dev\`
   - For production: \`npm start\`

## Test Credentials (after seeding)
- **Reporter**: \`reporter@example.com\` / \`password123\`
- **Resolver**: \`resolver@example.com\` / \`password123\`

## API Endpoints
### Auth
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Authenticate user & get token

### Incidents (Requires JWT)
- \`POST /api/incidents\` - Create an incident (Reporter only)
- \`GET /api/incidents/my\` - Get logged-in user's incidents (Reporter only)
- \`GET /api/incidents\` - Get all incidents (Resolver only)
- \`PUT /api/incidents/:id\` - Update incident status or priority (Resolver only)
