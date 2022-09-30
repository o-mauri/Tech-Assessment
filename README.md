#Omar Mauri Tech Assessment

Thanks for taking the time to review my technical assessment. A few notes:

- I have used Angular as a framework for the frontend as requested
- I have used python (flask) as a backend (mentioned in my interview this is my most experienced backend language)
- I have converted the CSV to a JSON file to handle the data as it is a data type i prefer, the script used for the conversion that I created can be found in the tools folder

## Setup Instructions 

The following is a step by step guide of how to set up the project to view

### Version Requirements

- Python Version >= 3.7
- NPM version >= 8.9


(The commands below are for linux/unix based systems - please convert as appropriate for windows)
### Launching backend
 1. Open a new terminal
 2. Navigate to backend folder: ``cd backend``
 3. Create a new virtual env running python 3.7>
 3. Install requirements: ``pip install -r requirements.txt``
 4. Run ``flask run``
 5. The backend will now be running on port 5000
 6. Visit 127.0.0.1:5000/ in a browser - if you see the health check message the backend is working correctly

### Launching frontend
1. Open another new terminal
2. Navigate to frontend project folder: ``cd frontend/aiimi-techtrial``
3. Install dependencies: ``npm install``
4. Run ``npm start``
5. You can now visit the web application from a browser by visiting - 127.0.0.1:4200

## Acceptance Criteria
- UI is styled to spec - **yes**
- After a user types 2 characters, matches are suggested below the search input - **yes**
- Matches on first and last name - **yes**
- After a user selects a match, all fields are returned as per UI spec - **yes**
- User can add to the dataset - **yes**
- New searches return newly created user info - **yes**
- Bonus: Phone and email validation - **yes**
- Bonus: Duplicates are rejected - **yes**

## Other info
I have included some screenshots in the screenshots folder which demonstrate some of the functionaltiy
