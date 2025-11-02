const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");
const mongoose = require("mongoose");

describe("🍬 Sweet API (Protected Routes)", () => {
  let token = "";

  const testUser = {
    username: "sweetTester",
    email: "sweet@example.com",
    password: "sweet123",
  };

  // 🧹 Clean DB before tests
  beforeAll(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // 1️⃣ Register user
    await request(app).post("/api/auth/register").send(testUser);

    // 2️⃣ Login to get token
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should deny access without a token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401);
  });

  it("should add a new sweet with a valid token", async () => {
    const sweet = {
      name: "Ladoo",
      category: "Indian",
      price: 25,
      quantity: 10,
    };

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(sweet);

    expect(res.statusCode).toBe(201);
    expect(res.body.sweet).toHaveProperty("name", sweet.name);
  });

  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.sweets)).toBe(true);
  });

  it("should update a sweet", async () => {
    const sweets = await Sweet.find();
    const sweetId = sweets[0]._id;

    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 30 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.price).toBe(30);
  });

  it("should delete a sweet", async () => {
    const sweets = await Sweet.find();
    const sweetId = sweets[0]._id;

    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Sweet deleted");
  });
});
