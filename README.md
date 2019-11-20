# Dashboard-



# Getting started
Clone the repository and open a terminal from the root folder containing the `app.js` file.

### Prerequisites
Install node.js and npm as instructed [here](https://blog.teamtreehouse.com/install-node-js-npm-mac).<br>

If you are using windows OS, install node.js and npm as instructed [here](https://blog.teamtreehouse.com/install-node-js-npm-windows).

To setup the local database:<br>
- Install [mysql](https://dev.mysql.com/downloads/).
- Run `mysql -u root -p` and after passing in the password, run `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`, replacing `password` with your password. A more secure alternative to do this is [here](https://stackoverflow.com/a/51918364).
- This is done due to incompatibility of the mysql package in this project and the mysql-server installed in the first point.
- Open Command Prompt and run `set DB_PASSWORD=password` with password as your database password.


### `npm install`
Run this to install dependencies.

### `npm start`
Runs the app<br><br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
