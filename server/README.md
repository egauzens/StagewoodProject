Setup and Installation Instructions

1. Clone this repo to your local machine using https://github.com/egauzens/StagewoodProject.git

2. Navigate to the cloned server directory and add a file name ".env". Inside this .env file add the following:

    MONGO_DB_URI= (insert the Uri to the MongoDB you want to connect)<br>
    JWT_SECRET_KEY= (insert any combination of letter and numbers i.e. 'riuyt58y7854y4hfurhf3')
    
3. Make sure you have your IP address whitelisted on the MongoDB database so that the application can access it.

4. Verify you have node installed by running the following command in the command prompt:

    node -v

5. If node is not installed, then install it on your machine

6. Using the command prompt navigate to the cloned server/client directory and run the following command to download the client dependencies:

    npm install

7. Using the command prompt navigate back to the server directory and run the following command to download the server dependencies:

    npm install

8. To execute and run the program type the following command into your cmd window inside the server directory:

    npm run dev
