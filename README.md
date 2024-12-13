# Account Management Application

A React-based user management application with features for account creation, authentication, and profile management.

## Features

### Authentication
- User registration with validation
- Secure login functionality
- Protected routes for authenticated users
- Automatic redirect to dashboard after login

### User Management
- Create new user accounts
- View and edit profile information
- Persistent user data using localStorage
- Form validation for all user inputs

### Profile Management
- View complete profile details
- Edit profile information
- Validation for profile updates
- Real-time feedback on form submissions

### User Interface
- Clean and modern design
- Responsive layout
- Toast notifications for user feedback
- Intuitive navigation
- Form validation messages
- Loading states and error handling

## Technology Stack

- React.js
- React Router DOM
- React Hot Toast
- Lucide React (for icons)
- Bootstrap (for styling)
- LocalStorage (for data persistence)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd account-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "react-router-dom": "^6.x.x",
    "react-hot-toast": "^2.x.x",
    "lucide-react": "^0.x.x",
    "bootstrap": "^5.x.x"
  }
}
```

## Usage

### Registration
1. Navigate to the registration page
2. Fill in required details:
   - Full Name
   - Gender
   - Email
   - Password
   - About (optional)
3. Submit the form to create an account

### Login
1. Navigate to the login page
2. Enter email and password
3. Submit to access your account

### Profile Management
1. Click on Profile in the navigation bar
2. View your profile information
3. Click "Edit Profile" to modify details
4. Save changes to update your profile

## Project Structure

```
src/
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
```

## Validation Rules

### Registration & Profile Update
- Full Name: Cannot contain numbers
- Email: Must be valid format
- Password: Minimum 8 characters
- About: Maximum 500 characters
