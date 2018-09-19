const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/db.json`);
const userdb = require('../src/dev-users.json');

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY =
  'cdfnju76%$$^&%%**%^$$%YUKUKLKTGWDCFWERGDWR#^httjyhbvet46u578ihe5EFVSbgry57uJ&^%';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  const result = jwt.verify(
    token,
    SECRET_KEY,
    (err, decode) => (decode !== undefined ? decode : err)
  );

  if (result instanceof Error) {
    throw result;
  }

  return result;
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return userdb.findIndex(user => user.email === email && user.password === password) !== -1;
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ email, password });
  res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('Run Auth API Server');
});
