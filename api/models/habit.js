const db = require('../dbConfig/init');

const User = require("./User");


module.exports = class Habit { 
    constructor(data, habit) {
      //From Albert branch
      this.id = data.id;
      this.habit_name = data.habit_name;
      this.habit_category = data.habit_category;
      
      // From Amarachi branch
      this.body = data.body
      this.username = data.username
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

  static async create(habitData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { habit_name, habit_category } = habitData;
        let user = await User.findOrCreateByName(habit_name);
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

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM habits WHERE id = $1 RETURNING habit_name;`,
          [this.id]
        );
        const user = await User.findById(result.rows[0].username);
        const habits = await user.habits;
        if (!habits.length) {
          //   await user.destroy(); No need to delete user
        }
        resolve("Habit was deleted");
      } catch (err) {
        reject("Habit could not be deleted");
      }
    });
  }
};