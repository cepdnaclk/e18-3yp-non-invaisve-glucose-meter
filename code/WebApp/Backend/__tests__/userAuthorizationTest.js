const express = require("express");
const request = require("supertest");
const userAuthRoute = require("../routes/userAuth");
const measurementRoute = require("../routes/measurementRoutes");
const app = express();
const db = require("../configurations/db");
const Users = require("../models/userPatient");

let token = "";
let refresh= "";
const date = 23;

const validUser = {
  email: "test1@gmail.com",
  password: "test1",
};

beforeAll(async () => {
  db.connect();
});

afterAll(async () => {
  db.close();
});

app.use(express.json());

app.use("/api/auth", userAuthRoute);

  // define test to login to the system with valid user
  describe("Login to the system with valid user", () => {
    console.log("Test: Login to the system with valid user");
    it("should return 200 status code with success true and user details", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(validUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        })
      );
      token = response.body.access_token;
      refresh = response.body.refresh_token;
    });

  });

  app.use("/api/glucose", measurementRoute);

    // define test to get measured values with authorized user
  describe("with authorization token", () => {
    console.log("Test: Test with authorization token");
    it("should return 200 status code with success true", async () => {
      const response = await request(app)
        .post(`/api/glucose/getRecentGlucose/${date}`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type",/html/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          
        })
      );
      
    });
  });

