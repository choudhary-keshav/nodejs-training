const { add, subtract, multiply, divide, err, myApp } = require("../testing");
const supertest = require("supertest");

test("toBe", () => {
  expect(add(2, 3)).toBe(5);
});

test("toBe", () => {
  expect(subtract(1, 2)).toBe(-1);
});

test("toBe", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("toBe", () => {
  expect(divide(1, 2)).toBe(0.5);
});

test("toBeNull", () => {
  expect(divide(1, 0)).not.toBeNull();
});

test("toBeGreaterThanOrEqual", () => {
  expect(add(1, 2)).toBeGreaterThanOrEqual(0);
});

test("toMatch", () => {
  expect(add("Hello", "World")).toMatch(/Hello/);
});

test("toThrow", () => {
  expect(() => err()).toThrow("I am a new error");
});

test("Testing GET users API", async () => {
  await supertest(myApp)
    .get("/users")
    .expect(200)
    .then((result: any) => {
      expect(result && result.body);
    });
});
