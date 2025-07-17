# Job Portal
A full-stack job portal application designed to connect job seekers with companies. Users can browse, search, and apply for jobs, while companies can post and manage job listings and review applications.

# Features
For Job Seekers:
User Authentication: Secure login and registration powered by Clerk.

Job Browsing: View a comprehensive list of available job postings.

Advanced Search & Filtering: Filter jobs by category, location, and search by job title or location keyword.

Detailed Job View: Access in-depth job descriptions, company details, and salary information.

Job Application: Apply for jobs directly through the platform (requires login and resume upload).

Resume Management: Upload and update your resume.

Application Tracking: View the status of all your submitted job applications.

For Companies/Recruiters:
Company Authentication: Secure login and registration for company accounts via Clerk.

Job Posting: Easily add new job listings with rich text descriptions, salary, location, and other details.

Job Management: Edit or delete existing job postings.

Applicant Management: View all applications for their posted jobs.

Application Status Update: Change the status of job applications (e.g., Pending, Accepted, Rejected).

# Tech Stack
This project is built using the MERN stack with modern frontend tooling and authentication services.

# Frontend:

React.js: A JavaScript library for building user interfaces.

Vite: A fast build tool for modern web projects.

React Router DOM: For client-side routing and navigation.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Clerk: For robust user and company authentication.

Axios: Promise-based HTTP client for making API requests.

React Toastify: For elegant toast notifications.

Moment.js: For parsing, validating, manipulating, and formatting dates.

k-convert: For converting large numbers (e.g., salaries) into human-readable formats (e.g., "K" for thousands, "M" for millions).

React Quill: A rich text editor component for job descriptions.

# Backend:

Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL document database.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

Clerk Webhooks: For synchronizing user data and events from Clerk to the backend.

# Installation & Setup
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (v18 or higher recommended)

MongoDB Atlas Account (or local MongoDB instance)

Clerk Account

1. Clone the Repository (will complete soon)
git clone <repository-url> # Replace with your actual repository URL
cd job-portal-app

2. Backend Setup
Navigate to the server directory:

cd server

Install backend dependencies:

npm install
# or
yarn install

Create a .env file in the server directory and add your environment variables:

PORT=5000
MONGO_URI=<Your_MongoDB_Connection_String>
CLERK_SECRET_KEY=<Your_Clerk_Backend_Secret_Key>
CLERK_WEBHOOK_SECRET=<Your_Clerk_Webhook_Secret> # Found in Clerk Dashboard -> Webhooks
COMPANY_TOKEN_SECRET=<A_Strong_Random_Secret_String_For_Company_Auth>

Start the backend server:

npm start
# or
yarn start

The backend server will run on http://localhost:5001 (or your specified PORT).

3. Frontend Setup
Open a new terminal and navigate to the project root (where package.json for the frontend is):

cd .. # If you are still in the 'server' directory

Install frontend dependencies:

npm install
# or
yarn install

Create a .env file in the project root (frontend) and add your environment variables:

VITE_CLERK_PUBLISHABLE_KEY=<Your_Clerk_Frontend_Publishable_Key>
VITE_BACKEND_URL=http://localhost:5000 # Or your deployed backend URL

Start the frontend development server:

npm run dev
# or
yarn dev

The frontend application will open in your browser, usually at http://localhost:5173.

4. Configure Clerk Webhooks
To ensure your backend database stays in sync with Clerk's user data (e.g., when a new user signs up), you need to configure a webhook in your Clerk Dashboard:

Go to your Clerk Dashboard.

Navigate to "Webhooks" under "Developer tools".

Click "Add endpoint".

Set the "Endpoint URL" to http://localhost:5000/webhooks (replace 5000 with your backend port if different).

Select the events you want to subscribe to. At a minimum, you'll likely need:

user.created

user.updated

user.deleted

(Optionally, organization.* events if you plan to use Clerk Organizations extensively)

Copy the "Webhook Secret" and add it to your backend's .env file as CLERK_WEBHOOK_SECRET.

Usage
Job Seekers:
Browse Jobs: Visit the homepage to see all available job listings.

Search & Filter: Use the search bar and filter options to find specific jobs.

Apply: Click on a job to view details. If logged in and resume is uploaded, click "Apply Now".

Manage Applications: Go to the /applications page to see your submitted applications and their statuses.

Profile: Upload/update your resume on your profile page.

Companies/Recruiters:
Login: Access the recruiter login/signup.

Dashboard: After logging in, navigate to /dashboard.

Add Job: Use the "Add Job" section to create new job postings.

Manage Jobs: In "Manage Jobs," you can edit or delete your existing listings.

View Applications: In "View Applications," see all applicants for your jobs and update their status (Accept/Reject).