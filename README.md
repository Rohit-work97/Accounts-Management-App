# Account Management Application
A React-based user management application with features for account creation, authentication, and profile management.
Features
Authentication

1. User registration with validation
2. Secure login functionality
3. Protected routes for authenticated users
4. Automatic redirect to dashboard after login

# User Management

1. Create new user accounts
2. View and edit profile information
3. Persistent user data using localStorage
4. Form validation for all user inputs

# Profile Management

1. View complete profile details
2. Edit profile information
3. Validation for profile updates
4. Real-time feedback on form submissions

# User Interface

1. Clean and modern design
2. Responsive layout
3. Toast notifications for user feedback
4. Intuitive navigation
5. Form validation messages
6. Loading states and error handling

Technology Stack

1. React.js
2. React Router DOM
3. React Hot Toast
4. Lucide React (for icons)
5. Bootstrap (for styling)
6. LocalStorage (for data persistence)

Installation

A.) Clone the repository:

bashCopygit clone [repository-url]
cd account-management-app

B.) Install dependencies:

bashCopynpm install

C.) Start the development server:

bashCopynpm run dev
Dependencies
jsonCopy{
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "react-router-dom": "^6.x.x",
    "react-hot-toast": "^2.x.x",
    "lucide-react": "^0.x.x",
    "bootstrap": "^5.x.x"
  }
}
Usage
A.) Registration

Navigate to the registration page
Fill in required details:

Full Name
Gender
Email
Password
About (optional)


Submit the form to create an account

B.) Login

Navigate to the login page
Enter email and password
Submit to access your account

C.) Profile Management

Click on Profile in the navigation bar
View your profile information
Click "Edit Profile" to modify details
Save changes to update your profile

D.) Project Structure
Copysrc/
├── components/
│   ├── Login.js
│   ├── Register.js
│   ├── Profile.js
│   ├── Navigation.js
│   └── Dashboard.js
├── App.js
└── styles/
    ├── Register.css
    └── Navigation.css
Validation Rules
Registration & Profile Update

Full Name: Cannot contain numbers
Email: Must be valid format
Password: Minimum 8 characters
About: Maximum 500 characters
