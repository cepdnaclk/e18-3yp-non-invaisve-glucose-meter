const express = require("express");
const request = require("supertest");
const userAuthRoute = require("../routes/userAuth");
const app = express();
const db = require("../configurations/db");
const Users = require("../models/userPatient");

let token = "";
let refresh= "";

const newUser = {
  username: "forTest",
  contact_no: "0000000000",
  email: "forTest@gmail.com",
  password: "forTest",
  age: 45,
  weignt: 56,
  height: 145
};

const validUser = {
  email: "test1@gmail.com",
  password: "test1",
};

const invalidUser = {
  email: "invalid@gmail.com",
  password: "InvalidPassword",
};

beforeAll(async () => {
  db.connect();
  // add a query to delete a user with the same name as newUser, if available
  await Users.deleteOne( { email: newUser.email } )
});

afterAll(async () => {
  db.close();
});

app.use(express.json());

app.use("/api/auth", userAuthRoute);

// Defining tests to test the user authenticatio functionalities
describe("Test user Authentications", () => {
  // Define test to register new user to the system
  describe("Signup to system as new User", () => {
    console.log("Test: Signup to system as new User");
    it("should return 200 status code with success true", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(newUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          
        })
      );
    });
  });

  // Define test to register existing user to the system
  describe("Signup to system with existing User", () => {
    console.log("Test: Signup to system with existing User");
    it("should return 200 status code with success false", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(newUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          
        })
      );
    });
  });

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

    // define test to login to the system with invalid user
  describe("Login to the system with invalid user", () => {
    console.log("Test: Login to the system with invalid user");
    it("should return 200 status code with success false", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(invalidUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          message: "Wrong credentials!",
          
        })
      );
      
    });
  });

});
