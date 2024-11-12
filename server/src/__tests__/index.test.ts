import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../index.js";

describe("Server API Tests", () => {
  it("GET / should return welcome message", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.body).toEqual({
      message: "Welcome to the API",
    });
  });

  it("should handle non-existent routes", async () => {
    await request(app).get("/non-existent-route").expect(404);
  });
});
