const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../config/config');
const User = require('./user.service');
const service = new User();
class Auth {
  async registerUser(data) {
    const newUserId = await service.insertUser(data);
    const newUser = await service.getUserById(newUserId.newId);
    const payload = {sub: newUserId.newId, username:newUser.username, role:newUser.role};
    const token = jwt.sign(payload, config.secretKey, {expiresIn: '4d'});
    delete newUser.password;
    return {newUser, token};
  }

  async signinUser(data) {
    const user = await service.getUserByEmail(data.email);
    const isMatch = await bcrypt.compare(data.password, user.password);

    if(!isMatch) throw boom.unauthorized('Contrasena invalida');

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role
    }
    const token = jwt.sign(payload, config.secretKey);
    delete user.password;
    return {user, token};
  }

}

module.exports = Auth;