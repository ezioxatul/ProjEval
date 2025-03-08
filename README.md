# ProjEval

ProjEval is an AI evaluator platform designed to streamline the assessment process for teachers. It supports custom evaluator creation, class management, and automated answer sheet evaluation for students. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)


## Features

- **Custom Evaluator Creation**: Facilitates the creation of custom evaluators tailored to specific subjects.
- **Class Management**: Allows the creation and management of classes under each evaluator for organizing test papers.
- **Student Data Management**: Create and maintain student records, including name, class, and roll number.
- **Test Material Upload**: Supports uploading question papers, answer keys, and student answer sheets for specific tests.
- **Automated Answer Sheet Evaluation**: Sequential evaluation of student answer sheets with scores displayed upon completion.
- **Evaluation Insights**: Provides a detailed breakdown of student scores for in-depth analysis.
- **Custom Instructions and Comments**: Teachers can add personalized instructions or comments during the evaluation process for better feedback.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js
- **Database**: PostgreSQL
- **AI Model**: OpenAI GPT-4

## Installation

Clone the repository and install the dependencies for both frontend and backend:

```bash
git clone https://github.com/your-username/ProjEval.git
cd ProjEval

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd ../backend
npm install
```
## Running the Application

To run the application locally, follow these steps:

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Start the backend server:
    ```bash
    npm start
    ```
