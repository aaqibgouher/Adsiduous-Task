const request = require("supertest");
const app = require("../index");
const authService = require("../service/authService");

let testUserEmail = "test@example.com";
let testUserName = "test";
let testUserPassword = "123456";
let token;

describe("Auth Routes", () => {
  beforeAll(async () => {
    // remove test user & files
    await authService.remove({ email: testUserEmail });
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: testUserName,
      email: testUserEmail,
      password: testUserPassword,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Successfully registered user");
  });

  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUserEmail, password: testUserPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Successfully login");
    expect(res.body.data).toHaveProperty("response");
    expect(res.body.data.response).toHaveProperty("token");

    // Save the token for next test
    token = res.body.data.response.token;
  });

  it("should return current user info", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `${token}`);

    expect(res.statusCode).toBe(200);
  });
});
