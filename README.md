# Kumbh Mela Tourism Website

A comprehensive tourism platform for Kumbh Mela, featuring user authentication, blog posts, lost and found services, attraction details, and more.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

## Overview

The Kumbh Mela Tourism Website is a full-stack web application designed to provide information and services for tourists planning to visit the Kumbh Mela festival. It includes features for users to browse tourist attractions, read and share blog posts, report and claim lost items, contact administrators, and more.

## Features

### User-Facing Features

- **User Authentication**
  - Sign up/login with email
  - Password reset via email with secure tokens
  - User profile management
  - OTP verification

- **Blog System**
  - View blogs about Kumbh Mela
  - Create, edit, and delete blogs (authenticated users)
  - Comment on blogs
  - Like blogs and comments

- **Lost and Found Services**
  - Report lost items
  - Report found items
  - Claim items with verification process
  - Search functionality for lost/found items

- **Tourist Information**
  - Tourist attractions
  - Guides and travel tips
  - FAQs about Kumbh Mela
  - Information about Prayagraj

- **Other Features**
  - Contact form
  - User feedback
  - Mobile-responsive design
  - Image uploads for blogs and lost/found items

### Admin Features

- Admin dashboard
- Manage users
- Moderate blogs and comments
- Process lost and found claims
- Review user feedback

## Tech Stack

- **React**: UI library for building the user interface
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **MongoDB**: NoSQL database

## Project Structure

The project is organized into two main directories:

### Frontend Structure

```
frontend/
├── public/           # Static files
├── src/              # Source files
│   ├── components/   # React components
│   ├── context/      # Context API files
│   ├── css/          # CSS stylesheets
│   ├── images/       # Image assets
│   ├── blogData/     # Static blog data
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
```

### Backend Structure

```
backend/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── public/           # Static assets
├── index.js          # Server entry point
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rachitkansal-dev/kumbh-react.git
   cd kumbh-react
   ```

2. Install dependencies for the entire project:
   ```bash
   npm run install-all
   ```

   This will install dependencies for the root project, frontend, and backend.

3. Configure environment variables (see [Environment Variables](#environment-variables) section)

4. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/kumbh_mela
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
```

## Available Scripts

In the project directory, you can run:

### `npm run install-all`

Installs dependencies for the root project, frontend, and backend.

### `npm start`

Runs both the frontend and backend concurrently.
- Frontend will be available at [http://localhost:3000](http://localhost:3000)
- Backend will be available at [http://localhost:8080](http://localhost:8080)

### `npm run start-frontend`

Runs only the frontend application in development mode.

### `npm run start-backend `

Runs only the backend server.

### `npm run build`

Builds the frontend application for production to the `frontend/build` folder.
