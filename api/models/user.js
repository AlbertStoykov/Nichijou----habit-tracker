const db = require('../dbConfig/init'); 
const SQL = require('sql-template-strings');


 class User {
  
  constructor(data) {
    
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.userName = data.username;
    this.email = data.email;
    this.userPassword = data.user_password;
  }

  static get all(){
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(SQL`SELECT * FROM users;`);
            let users = result.rows.map(r => new User(r))
            res(users)  
        } catch (err) { //catch any error 
            rej(`Error retrieving users: ${err}`) 
        }
    })
}

static create({firstname,lastname, username, email, password }){ 
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(SQL`INSERT INTO users (first_name,last_name,username, email, user_password)
                                            VALUES (${firstname}, ${lastname},${username}, ${email}, ${password}) RETURNING *;`);
            let user = new User(result.rows[0]);
            res(user)
        } catch (err) {
            rej(`Error creating user: ${err}`)
        }
    })
}

static findByEmail(email){ 
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(SQL`SELECT * FROM users
                                            WHERE email = ${email};`);
            let user = new User(result.rows[0])
            res(user) 
        } catch (err) { 
            rej(`Error retrieving user: ${err}`) 
        }
    })
}
}

module.exports = User 