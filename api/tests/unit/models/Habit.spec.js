const Habit = require("../../../models/habit");
const User = require("../../../models/user");

jest.mock("../../../models/User");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("Habit", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await User.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("findById", () => {
    test("it resolves with habit on successful db query, found by ID", async () => {
      let habitData = {
        id: 1,
        habit_name: "testHabit1",
        habit_category: "testHabitCat1",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [habitData] });
      const result = await Habit.findById(1);
      expect(result).toBeInstanceOf(Habit);
    });
  });

  describe("create", () => {
    test("it resolves with a new habit on successful db query", async () => {
      let habitData = {
        id: 1,
        habit_name: "testHabit1",
        habit_category: "testHabitCat1",
      };
      //   jest
      //     .spyOn(db, "query")
      //     .mockResolvedValueOnce({ rows: [{ ...habitData, id: 1 }] });
      //   jest
      //     .spyOn(User, "findOrCreateByName")
      //     .mockResolvedValueOnce(new User({ id: 1, first_name: "Test Author" }));
      const result = await Habit.create(habitData);
      expect(result).toHaveProperty("id");
    });
  });
});
