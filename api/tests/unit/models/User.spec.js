const User = require("../../../models/User");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await User.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("habits", () => {
    test("it resolves with formatted habits on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          { id: 1, habit_name: "testHabit1", habit_category: "testHabitCat1" },
          { id: 2, habit_name: "testHabit2", habit_category: "testHabitCat2" },
        ],
      });
      let testUser = new User({
        id: 1,
        first_name: "Test User",
      });
      const habits = await testUser.habits;
      expect(habits).toHaveLength(2);
      expect(habits[0]).toHaveProperty("path", "/habits/1");
    });
  });

  describe("destroy", () => {
    test("it resolves with message on successful db query", async () => {
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ id: 1, username: "user1" });
      let testUser = new User({
        id: 1,
        first_name: "Test User 1",
        last_name: "Test User 1",
        username: "user1",
        user_password: "hashed",
        email: "user1@gmail.com",
      });
      const result = await testUser.destroy();
      expect(result).toBe(`User user1 was deleted`);
    });
  });

  describe("findById", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = { id: 1, first_name: "Test User 1" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findById(1);
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("create", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 1,
        first_name: "Test",
        last_name: "Test",
        username: "user1",
        user_password: "hashed",
        email: "user1@gmail.com",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.create("Test");
      expect(result).toBeInstanceOf(User);
    });
  });

  // describe('findOrCreateByName', () => {
  //     test('it calls on Author.create if name not found', async () => {
  //         let authorData = { id: 1, name: 'New Author' }
  //         jest.spyOn(db, 'query')
  //             .mockResolvedValueOnce({rows: [ ] });
  //         const createSpy = jest.spyOn(Author, 'create')
  //             .mockResolvedValueOnce(new Author(authorData));
  //         const result = await Author.findOrCreateByName('New Author');
  //         expect(createSpy).toHaveBeenCalled();
  //         expect(result).toBeInstanceOf(Author);
  //     })

  //     test('it does not call on Author.create if name found', async () => {
  //         let authorData = { id: 1, name: 'Old Author' }
  //         jest.spyOn(db, 'query')
  //             .mockResolvedValueOnce({rows: [ authorData ] });
  //         const createSpy = jest.spyOn(Author, 'create')
  //             .mockResolvedValueOnce(new Author(authorData));
  //         const result = await Author.findOrCreateByName('Old Author');
  //         expect(createSpy).not.toHaveBeenCalled();
  //         expect(result).toBeInstanceOf(Author);
  //     })
  // });
});
