#Setup and Installation Instructions

Clone this repo to your local machine using https://github.com/egauzens/StagewoodProject.git

Navigate to the cloned server directory and add a file name ".env". Inside this .env file add the following:

MONGO_DB_URI= (insert the Uri to the MongoDB you want to connect)
JWT_SECRET_KEY= (insert any combination of letter and numbers i.e. 'riuyt58y7854y4hfurhf3')

Verify you have node installed by running the following command:

node -v

If node is not installed, then install it on your machine

Finally, to execute and run the program, type the following command into your cmd window inside the server directory:

npm run dev
