module.exports = class UserDto {
  id;
  username;
  email;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
  }
};
