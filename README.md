## Agarioo

## Project 
I am working on a web game that is going to be a game very similar to the popular game Agar.io
You play as a 2D blob and the goal of the game is to grow by eating smaller blobs and avoid being eaten by bigger blobs. You can also splitt you blob into 2 pieces to either attack or escape. It's all about strategy, timing, and skill to survive and become the largest cell in the game!

## Web-Application
The agario page front end is created with a react app and Tailwind. It contains a log in and register page which is used to create users for the game, then it has a game page where you play.

## Database and api
I am using mariadb database as the backend and thats where i store the users information. I have connected the database with the web trough Flask api. The database has one table. The table contains username, password, user-id and highscore. user-id is the primary key and highscore has a default value of 0.

## Installation and running

To get my code you would need to open terminal the terminal and write the following: 
```bash
git clone https://github.com/Softensavo/Agarioo
```
This will download the code for the flask api and react page. Then you would need to create a database and change the connection from my database to yours in the flask api

To be able to run the program you will need a few libraries. Here is a list of every library you need:
Python libraries:
- flask
- flask_restful
- flask_jwt_extended
- flask_cors
- flask_bcrypt
- typing
- mariadb
- sys

Write this in your terminal to install them:

For windows
```bash
  pip install flask flask_restful flask_jwt_extended flask_cors flask_bcrypt typing mariadb sys
```
For mac/linux: 
```bash
  pip3 install flask flask_restful flask_jwt_extended flask_cors flask_bcrypt typing mariadb sys
```

Front end:
- **React:**
  To install react you can follow this guide [here](https://react.dev/learn/installation)
- **Typescript:**
  To install typescript write the following in the terminal:
  ```bash
  run npm install -g typescript
  ```
- **Tailwind:**
  To install tailwind write the following in the terminal:
  ```bash
  npm install -D tailwindcss
  npx tailwindcss init
  ```

After that you will have everything you need to run the app.
To run the app you would need to run both the api and react page at the same time. 
to run the flask api go into the terminal where you python code is and write:

For windows:
```bash
python main.py
```
For Mac/linux:
```bash
python3 main.py
```
then open another terminal and go into the place where you have the react code and write:
```bash
npm run dev
```

##Contact Me

Email: alvar.gjerde@gmail.com


