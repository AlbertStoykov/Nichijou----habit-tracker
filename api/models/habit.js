const db = require('../dbConfig/init');


class Habit { 
    constructor(data) {
        this.body = data.body
        this.username = data.username
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try { 
                let result = await db.query(`SELECT posts.*, users.username as username 
                                                    FROM posts 
                                                    JOIN users 
                                                    ON posts.user_id = users.id;`);
                let posts = result.rows.map(r => new Post(r)) 
                res(posts) 
            } catch (err) { 
                rej(`Error retrieving posts: ${err}`) // reject request and respond with message and specific error
            }
        })
    }
}

module.exports = Habit
