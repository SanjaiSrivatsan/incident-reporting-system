# Incident Reporting Frontend

This is the React frontend for the Incident Reporting Management System.

## Technologies Used
- React + Vite
- React Router DOM
- Axios
- Context API (for Auth state management)

## Features
- **Authentication**: Login and Registration pages with automatic redirect.
- **Role-Based Routing**: 
  - Reporter is restricted to `/reporter`
  - Resolver is restricted to `/resolver`
- **Reporter Dashboard**: Create incidents and view personal incidents in a table.
- **Resolver Dashboard**: View all incidents, and dynamically update status/priority directly from the table using dropdowns. Includes error handling if a priority downgrade is attempted.

## Setup Instructions

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
2. **Environment Configuration**:
   Create a \`.env\` file in the root of the \`frontend\` directory (copy from \`.env.example\`):
   \`\`\`env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`
   Make sure your backend is running on this URL.
3. **Run the Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open the displayed local URL (usually \`http://localhost:5173\`) in your browser.

## Using the app
- You can register a new user as a REPORTER or RESOLVER from the register page.
- You can login using the test credentials created by the backend seed script.
