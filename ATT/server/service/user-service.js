const db = require("../models/index");
const bcrypt = require("bcryptjs");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(username, email, password) {
    let candidate = await db.User.findOne({
      where: {
        username,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest("Failed! Username is already in use!");
    }
    candidate = await db.User.findOne({
      where: {
        email,
      },
    });

    if (candidate) {
      throw ApiError.BadRequest("Failed! Email is already in use!");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await db.User.create({
      username,
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    const accessToken = tokenService.generateTokens({ ...userDto });
    return { accessToken, user: { ...userDto } };
  }

  async login(email, password) {
    let user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw ApiError.BadRequest("Failed! There is no such user!");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Failed! Wrong password!");
    }
    const userDto = new UserDto(user);
    const accessToken = tokenService.generateTokens({ ...userDto });
    return { accessToken, user: { ...userDto } };
  }

  async postForm(id, holiday, season) {
    const form = await db.Form.create({ holiday, season, UserId: id });
    if (!form) {
      throw ApiError.BadRequest("Failed! The form wasn't saved");
    }
    return form;
  }
}
module.exports = new UserService();
