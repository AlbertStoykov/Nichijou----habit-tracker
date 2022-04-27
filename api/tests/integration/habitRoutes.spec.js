describe("habits endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close();
  });

  it("should return a list of all habits in database", async () => {
    const res = await request(api).get("/habits");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  it("should create a new habit", async () => {
    const res = await request(api).post("/habits").send({
      title: "New Book",
      authorName: "Test Author 1",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");

    const authRes = await request(api).get("/habits/1");
    expect(authRes.body.habits.length).toEqual(3);
  });

  it("should not create a new habit with over 100 characters", async () => {
    const res = await request(api).post("/habits").send({
      habit_category: "Long, Long Habit Name",
      habit_name:
        "YyYXJHN8ovVJHDYn7kOl1griWoH8rw3Q7vaAxeyopIDG2NTZRIwQbhY7ykbuwZE2ohowLvUcxDMncPX6hwkrYLX4CrP5Y3nKsb6A9xfOFSsKTYvpmFeTSkDYkJNeszfeNF7I2iQqxWfWSYWH5PRYTLJUnU9Lq8rq0LKi24BkG5OWYWO3W0Nt2YCsbuJYamiWzPutJVfZ4oDg9dQUBy64d6a5tGCrNgSfyPzeg2wWgPHBLGfDEZPYO1zGsumYIr8Wh9l4cpyr5zuozn6kBkEz5mXfiZ",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("err");

    const habitRes = await request(api).get("/habits/4");
    expect(habitRes.statusCode).toEqual(404);
  });

  it("should delete a habit", async () => {
    const res = await request(api).delete("/habits/1");
    expect(res.statusCode).toEqual(204);

    const habitRes = await request(api).get("/habits/1");
    expect(habitRes.statusCode).toEqual(404);
    expect(habitRes.body).toHaveProperty("err");
  });
});
