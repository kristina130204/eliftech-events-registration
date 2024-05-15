<h1>Stack for this project:</h1>

For backend: Node.js v20.12.2

For frontend: React.js v18.3.1

Database: MongoDB

<h1>How to run this app locally</h2>

<h2>Server side</h2>

First you need to install all dependencies by typing 'npm i' in terminal for the <strong>backend</strong> folder. Then you need to create .env file where you will initialize environment variables <strong>PORT</strong> (port for server) and <strong>DB_PATH</strong> (connection string for your MongoDB cluster). Type 'npm run seed' to start seeding script. This script takes 10 events from faker.api by 1 minute. You can open another terminal and type 'npm start' for starting developing server while seeding script is working.

<h2>Client side</h2>

Install all needed dependencies by typing 'npm i' in terminal for the <strong>frontend</strong> folder. Go to the file <strong>axios.js</strong> and change baseURL to URL of your local server. Type 'npm start' to run app on developing mode or 'npm run build' to build project.
