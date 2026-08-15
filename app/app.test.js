const request = require("supertest");
const app = require("./app");

describe("NordicByte API", () => {
    test("GET /health should return healthy status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    test("GET /api/tasks should return tasks", async () => {
        const response = await request(app).get("/api/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/tasks should create a task", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Learn automated testing"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Learn automated testing");
        expect(response.body.completed).toBe(false);
    });
});