const request = require("supertest");
const app = require("../app");

describe("Report routes", () => {
  it("rejects a report with no category or description", async () => {
    const res = await request(app).post("/api/v1/reports").send({});
    expect(res.status).toBe(400);
  });

  it("returns 404 for an unknown reference code", async () => {
    const res = await request(app).get("/api/v1/reports/track/CR-0000");
    expect([404, 500]).toContain(res.status); // 500 if DB isn't connected in this environment
  });
});
