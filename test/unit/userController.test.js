const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../../controllers/userController");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateToken");
const jwt = require("jsonwebtoken");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../utils/generateToken");
jest.mock("../../models");

describe("User Controller", () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
      it('should returen 400 if required fields are missing', async () => {
        const req = {
          body: {
            email: 'jdoe@me.com',
            password: 'password123',
          },
        };
        const res ={
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        }

        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          status: 'error',
          message: 'All fields are required'
        });
      })
  });
});
