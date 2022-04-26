const db = require("../dbConfig/init");

module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.username = data.username;
    this.user_password = data.user_password;
    this.email = data.email;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(`SELECT * FROM users;`);
        const users = result.rows.map((a) => ({
          id: a.id,
          username: a.username,
        }));
        resolve(users);
      } catch (err) {
        reject("Error retrieving users");
      }
    });
  }

  get habits() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `SELECT id, habit_name, habit_category FROM habits WHERE id = $1;`,
          [this.id]
        );
        const habits = result.rows.map((b) => ({
          category: b.habit_category,
          habit: b.habit_name,
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
          `DELETE FROM users WHERE username = $1 RETURNING username;`,
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

  static create(name) {
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
