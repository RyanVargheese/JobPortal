# Insider Jobs

A modern, full-stack job portal application designed to seamlessly connect job seekers with companies, offering a streamlined experience for both parties.

Why This Job Portal? (Advantages)
This platform stands out by providing a comprehensive and user-friendly experience, addressing key needs for both job seekers and companies:

For Job Seekers:

Effortless Job Discovery: Quickly find relevant job opportunities with intuitive search, filtering by category and location, and keyword search.

Streamlined Application Process: Apply directly through the platform with easy resume uploads and a clear view of application status.

Personalized Experience: Manage your profile, track your applications, and keep your resume updated in one place.

Secure & Reliable: Built with robust authentication, ensuring your data and applications are handled securely.

For Companies/Recruiters:

Simplified Job Management: Easily post, edit, and manage all your job listings from a dedicated dashboard.

Efficient Applicant Tracking: View all applications for your jobs in one centralized location.

Quick Status Updates: Swiftly change application statuses (e.g., Pending, Accepted, Rejected) to manage your hiring pipeline effectively.

Secure Company Access: Dedicated authentication ensures only authorized personnel can manage company listings and applicants.

Tech Stack
This project leverages the power of the MERN stack combined with modern frontend tooling and robust authentication services to deliver a fast, scalable, and secure application.

# Frontend:

React.js: Building dynamic and responsive user interfaces.

Vite: For blazing-fast development server and optimized builds.

React Router DOM: Handling client-side navigation and nested routes.

Tailwind CSS: Utility-first styling for rapid and consistent UI development.

Clerk: Comprehensive user and company authentication, handling sign-up, login, and session management.

Axios: Efficient HTTP client for seamless API communication.

React Toastify: Providing user-friendly, non-intrusive notifications.

Moment.js: For intuitive date and time formatting (e.g., "Posted 3 days ago").

k-convert: For human-readable numerical formatting (e.g., "50K" for salaries).

React Quill: A rich text editor for detailed job descriptions.

# Backend:

Node.js & Express.js: Building a powerful and flexible RESTful API.

MongoDB & Mongoose: A NoSQL database for flexible data storage and an ODM for elegant data modeling.

Clerk Webhooks: Synchronizing user data and events from Clerk to the backend database.

Bcrypt: For secure password hashing.

JSON Web Token (JWT): For custom company/recruiter authentication and authorization.

Cloudinary: Cloud-based media management for storing resumes and images.

Multer: Middleware for handling multipart/form-data (file uploads).

Svix: For verifying the authenticity and integrity of Clerk webhooks.

Sentry: For error tracking and performance monitoring.

Installation & Setup (How to Use It - For Developers)
To get a local copy of the project up and running for development or testing, follow these steps:

# Prerequisites
Ensure you have the following installed:

Node.js: (v18 or higher recommended)

npm: (comes with Node.js) or Yarn

MongoDB Atlas Account: (or a local MongoDB instance running)

Clerk Account: (for authentication services)

Cloudinary Account: (for media storage)

1. Clone the Repository
git clone <repository-url> # Replace with your actual repository URL
cd job-portal-app

2. Backend Setup
Navigate into the server directory, install dependencies, and configure environment variables.

cd server
npm install # or yarn install

Create a .env file in the server directory and populate it with your credentials:

PORT=5001
MONGO_URI=<Your_MongoDB_Connection_String>
CLERK_SECRET_KEY=<Your_Clerk_Backend_Secret_Key>
CLERK_WEBHOOK_SECRET=<Your_Clerk_Webhook_Secret_from_Dashboard>
COMPANY_TOKEN_SECRET=<A_Strong_Random_Secret_String_For_Company_Auth>
CLOUDINARY_NAME=<Your_Cloudinary_Cloud_Name>
CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
CLOUDINARY_SECRET_KEY=<Your_Cloudinary_API_Secret>
SENTRY_DSN=<Your_Sentry_DSN_for_Backend> # If using Sentry

Start the backend server:

npm start # or yarn start

The backend API will be accessible at http://localhost:5001 (or your chosen PORT).

3. Frontend Setup
Open a new terminal, navigate back to the project root, install dependencies, and configure environment variables.

cd .. # If you are still in the 'server' directory
npm install # or yarn install

Create a .env file in the project root (frontend) and add your environment variables:

VITE_CLERK_PUBLISHABLE_KEY=<Your_Clerk_Frontend_Publishable_Key>
VITE_BACKEND_URL=http://localhost:5001

Start the frontend development server:

npm run dev # or yarn dev

The frontend application will typically open in your browser at http://localhost:5173.

4. Configure Clerk Webhooks
For user data synchronization, set up a webhook in your Clerk Dashboard:

Go to your Clerk Dashboard -> Webhooks.

Click "Add endpoint".

Set the "Endpoint URL" to http://localhost:5001/webhooks (adjust port if needed).

Subscribe to events like user.created, user.updated, user.deleted.

Copy the "Webhook Secret" and add it to your backend's .env file as CLERK_WEBHOOK_SECRET.

Usage (How to Use It - For Users)
For Job Seekers:
Explore Jobs: Navigate to the homepage (/) to browse all available job listings.

Find Your Fit: Use the search bar to look for specific job titles or locations. Apply filters by category (e.g., "Software Development", "Marketing") to narrow down your options.

View Details: Click on any job card to see a comprehensive description, salary details, and company information.

Apply for Jobs:

Sign Up/Login: If you're new, sign up using your email/password or social accounts. If you're a returning user, simply log in.

Upload Resume: Ensure your resume is uploaded in your profile section.

Click the "Apply Now" button on the job details page.

Track Applications: Visit the "My Applications" page (/applications) to monitor the status of all your submitted job applications (e.g., Pending, Accepted, Rejected).

For Companies/Recruiters:
Access Recruiter Dashboard:

Sign Up/Login: Use the "Recruiter Login" option to create or access your company account.

Once authenticated, you'll be redirected to the dashboard (/dashboard).

Add New Jobs: Go to the "Add Job" section (/dashboard/add-job) to create new job postings for your company. Fill in all relevant details including title, description, location, and salary.

Manage Existing Jobs: In the "Manage Jobs" section (/dashboard/manage-jobs), you can view all your active job postings. Here, you can:

Edit: Update details of a job posting.

Toggle Visibility: Make a job posting visible or invisible to job seekers.

Delete: Remove a job posting.

Review Applications: Visit the "View Applications" section (/dashboard/view-applications) to see all applications submitted for your company's jobs.

View Resumes: Click on the "Resume" link to download or view the applicant's resume.

Update Status: For each applicant, you can change their status (e.g., "Accept", "Reject") directly from the table.
