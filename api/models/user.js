const db = require("../dbConfig/init"); // required the db as the model is connect to the db
// requires db configurations as the model is connected to the db

module.exports = class User {
  //specifies value wanted from specific key for the endpoint user
  constructor(data) {
    // it wants data on the username,email and the salted and then hashed(encrypted) password
    this.username = data.username;
    this.email = data.email;
    this.password = data.user_password;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      // each time a user login's
      try {
        let result = await db.query(`SELECT * FROM users;`); // wait for request for specific data wanted from the pg db, in this case is all the data from the user table
        //this may take sometime so you ahve to wait + this code has to be completed before doing the other code
        let users = result.rows.map((a) => ({
          id: a.id,
          username: a.username,
        }));
        res(users); //respond with requested data from db
      } catch (err) {
        //catch any error
        rej(`Error retrieving users: ${err}`); // reject error and response will error message which includes specific error
      }
    });
  }

  static create({ first_name,last_name,username, email,password }) {
    // create an username,email and password which represents each time a user registers
    // a new username,email and password is created
    return new Promise(async (res, rej) => {
      try {
        // wait for the request of adding(insert) a new,email and encrypted password to to the pg db
        let result =
          await db.query(`INSERT INTO users (first_name,last_name,username, email, password_digest)
                                                VALUES (${first_name},${last_name},${username}, ${email}, ${password}) RETURNING *;`);
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`Error creating user: ${err}`);
      }
    });
  }

  static findByEmail(email) {
    // resetting password using email address
    return new Promise(async (res, rej) => {
      try {
        // wait to check if the email inputted for reset corresponds to any of the emails
        // in the email attribute in the user table in the pg db
        let result = await db.query(`SELECT * FROM users
                                                WHERE email = $1;`, [email]);
        let user = new User(result.rows[0]);
        res(user); // if it does response
      } catch (err) {
        // catch errors
        rej(`Error retrieving user: ${err}`); // reject errors and send error message
      }
    });
  }

  get habits() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `SELECT *
          FROM recurring_habits
          WHERE recurring_habits.id = $1;`,
          [this.id]
        );
        const habits = result.rows.map((b) => ({
          category: b.habit_category,
          habit: b.habit_name,
          path: `/habits/${b.id}`,
        }));
        resolve(habits);
      } catch (err) {
        reject("User's habits could not be found");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE * FROM users WHERE username = $1 RETURNING username;`,
          [this.username]
        );
        resolve(`User ${result.username} was deleted`);
      } catch (err) {
        reject("User could not be deleted");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [
          id,
        ]);
        let user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User not found");
      }
    });
  }

  static create(id, first_name, last_name, username, user_password, email) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          `INSERT INTO users (id, first_name, last_name, username, user_password, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
          [id, first_name, last_name, username, user_password, email]
        );
        let user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User could not be created");
      }
    });
  }

  static findOrCreateByName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        let user;
        const userData = await db.query(
          `SELECT * FROM users WHERE first_name = $1;`,
          [first_name]
        );
        if (!userData.rows.length) {
          // user = await User.create(name);
        } else {
          user = new User(userData.rows[0]);
        }
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }
};
