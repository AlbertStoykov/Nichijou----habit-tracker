const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');


class Habit { 
    constructor(data) {
      this.body = data.body
      this.username = data.username
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try { 
                let result = await db.query(SQL`SELECT habits.*, users.username as username 
                                                    FROM habits
                                                    JOIN users 
                                                    ON habits.user_id = users.id;`);
                let habits = result.rows.map(r => new Habit(r)) 
                res(habits) 
            } catch (err) { 
                rej(`Error retrieving Habit: ${err}`) // reject request and respond with message and specific error
            }
        })
    }
}

module.exports = Habit
