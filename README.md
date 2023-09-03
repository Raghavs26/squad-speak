# Project Setup Instructions

## Install Dependencies

1. **Backend Setup:**

   - Open your terminal.

   - Navigate to the `backend` folder

   - Install the required dependencies by running:
     ```
     npm i
     ```

   - Create a `.env` file in the `backend` folder with the following variables:

     ```plaintext
     API_PORT=
     MONGO_URI=
     TOKEN_KEY=
     ```

     Be sure to replace the placeholders (`API_PORT`, `MONGO_URI`, and `TOKEN_KEY`) with your actual configuration values. 

     - `API_PORT` should be different from the default port used by your frontend application (Vite uses port 5173).

2. **Frontend Setup:**

   - In your terminal, navigate to the `frontend` folder:
     ```
     cd path/to/frontend
     ```

   - Install the required dependencies for the frontend by running:
     ```
     npm i
     ```

## Running the Project

To run both the backend and frontend simultaneously using `concurrently`, follow these steps:

1. **Start Both Frontend and Backend:**

   - In your terminal, navigate to the `frontend` folder
     
   - Start both the frontend and backend concurrently by running:
     ```
     npm run start
     ```

This will launch both your frontend and backend applications using `concurrently`.

Make sure you've configured your backend properly with the `.env` file before starting the project.
