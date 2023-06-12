const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('./../../../config/config');

const cookieExtractor = (req) => {
  console.log('extractor');
  let token = req.cookies.token_session;
  return token;
}

const JwtStrategy = new Strategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.secretKey
}, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;