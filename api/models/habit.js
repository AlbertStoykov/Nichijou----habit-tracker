const db = require("../dbConfig/init");

const User = require("./User");

module.exports = class Habit {
  constructor(data, habit) {
    this.id = data.id;
    this.habit_name = data.habit_name;
    this.habit_category = data.habit_category;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let habitData = await db.query(`SELECT * FROM habits;`);
        let habits = habitData.rows.map((b) => new Habit(b));
        resolve(habits);
      } catch (err) {
        reject("Habits not found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let habitData = await db.query(
          `SELECT habits.*, users.username as username
           FROM habits
           JOIN users ON habits.id = users.id
           WHERE habits.id = $1;`,
          [id]
        );
        let habit = new Habit(habitData.rows[0]);
        resolve(habit);
      } catch (err) {
        reject("Habit not found");
      }
    });
  }

  static async create(habitData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { habit_name, habit_category } = habitData;
        let result = await db.query(
          `INSERT INTO habits (habit_name, habit_category)
                                            VALUES ($1, $2)
                                            RETURNING *;`,
          [habit_name, habit_category]
        );
        resolve(result.rows[0]);
      } catch (err) {
        reject("Habit could not be created");
      }
    });
  }

  // destroy() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await db.query(
  //         `DELETE FROM habits WHERE id = $1 RETURNING id;`,
  //         [this.id]
  //       );
  //       // const user = await User.findById(result.rows[0].id);
  //       // const habits = await user.habits;
  //       // if (!habits.length) {
  //       //     await user.destroy(); No need to delete user
  //       // }
  //       resolve("Habit was deleted");
  //     } catch (err) {
  //       reject("Habit could not be deleted");
  //     }
  //   });
  // }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM habits WHERE habit_name = $1 RETURNING habit_name;`,
          [this.habit_name]
        );
        resolve(`Habit ${result.habit_name} was deleted`);
      } catch (err) {
        reject("Habit could not be deleted");
      }
    });
  }
};
