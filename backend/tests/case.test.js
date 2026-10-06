const request = require("supertest");
const app = require("../app");

describe("Case routes", () => {
  it("requires authentication to list cases", async () => {
    const res = await request(app).get("/api/v1/cases");
    expect(res.status).toBe(401);
  });
});
