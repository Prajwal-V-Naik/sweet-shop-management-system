const request = require("supertest");
const app = require("../app");

describe("Auth API – User Login", () => {
    const testUser = {
        username: "testUser",
        email: "testuser@example.com",
        password: "test123",
    }

    beforeAll(async () => {
        await request(app).post("/api/auth/register").send(testUser);
    })

    it("should log in an existing user successfully", async () => {
        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: testUser.password
        })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("token")
        expect(res.body.user.email).toBe(testUser.email)
    })
})
