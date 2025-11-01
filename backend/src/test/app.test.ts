const request = require("supertest")
const app = require("../app")

describe("App Root", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/")
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("API running")
  })
})