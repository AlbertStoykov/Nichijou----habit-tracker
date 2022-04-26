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
          name: a.username,
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
          `SELECT id, habit_name FROM habits WHERE id = $1;`,
          [this.id]
        );
        const habits = result.rows.map((b) => ({
          name: b.habit_name,
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
          `DELETE FROM users WHERE id = $1 RETURNING username;`,
          [this.id]
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

  //   static create(name) {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let authorData = await db.query(
  //           `INSERT INTO authors (name) VALUES ($1) RETURNING *;`,
  //           [name]
  //         ); //backtip and semi column
  //         let author = new Author(authorData.rows[0]);
  //         resolve(author);
  //       } catch (err) {
  //         reject("Author could not be created");
  //       }
  //     });
  //   } Creating User not needed, this will be done through sign up process.

  //   static findOrCreateByName(name) {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         let author;
  //         const authorData = await db.query(
  //           `SELECT * FROM authors WHERE name = $1;`,
  //           [name]
  //         ); //backtip
  //         if (!authorData.rows.length) {
  //           author = await Author.create(name);
  //         } else {
  //           author = new Author(authorData.rows[0]);
  //         }
  //         resolve(author);
  //       } catch (err) {
  //         reject(err);
  //       }
  //     });
  //   }
};
