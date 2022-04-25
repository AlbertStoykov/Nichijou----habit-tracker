const db = require("../dbConfig/init");

const Author = require("./Habit");

module.exports = class Habit {
  constructor(data, habit) {
    this.id = data.id;
    this.habit_name = data.habit_name;
    this.habit_category = data.habit_category;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let bookData = await db.query(`SELECT * FROM books;`); //backtip
        let books = bookData.rows.map((b) => new Book(b));
        resolve(books);
      } catch (err) {
        reject("Book not found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let bookData = await db.query(
          `SELECT books.*, authors.name as author
                                                    FROM books 
                                                    JOIN authors ON books.author_id = authors.id
                                                    WHERE books.id = $1;`,
          [id]
        ); //SQL query
        let book = new Book(bookData.rows[0]);
        resolve(book);
      } catch (err) {
        reject("Book not found");
      }
    });
  }

  static async create(bookData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { title, yearOfPublication, abstract, authorName } = bookData;
        let author = await Author.findOrCreateByName(authorName);
        let result = await db.query(
          `INSERT INTO books (title, year_of_publication, abstract, author_id)
                                            VALUES ($1, $2, $3, $4)
                                            RETURNING *;`,
          [title, yearOfPublication, abstract, author.id]
        );
        resolve(result.rows[0]);
      } catch (err) {
        reject("Book could not be created");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM books WHERE id = $1 RETURNING author_id;`,
          [this.id]
        ); //backtip
        const author = await Author.findById(result.rows[0].author_id);
        const books = await author.books;
        if (!books.length) {
          await author.destroy();
        }
        resolve("Book was deleted");
      } catch (err) {
        reject("Book could not be deleted");
      }
    });
  }
};
