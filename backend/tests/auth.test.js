const request = require("supertest");
const app = require("../app");

describe("Auth routes", () => {
  it("rejects login with missing fields", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("rejects registration with missing fields", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({ email: "a@example.com" });
    expect(res.status).toBe(400);
  });
});
