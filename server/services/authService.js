const axios = require('axios');

const OAUTH_URL = process.env.APPID_OAUTH_URL;
const CLIENT_ID = process.env.APPID_CLIENT_ID;
const SECRET = process.env.APPID_SECRET;

// Register new user
async function registerUser(name, email, password) {
  const response = await axios.post(
    `${OAUTH_URL}/cloud_directory/sign_up?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/login`,
    {
      emails: [{ value: email, primary: true }],
      password: password,
      name: { formatted: name }
    }
  );
  return response.data;
}

// Login user
async function loginUser(email, password) {
  const response = await axios.post(
    `${OAUTH_URL}/token`,
    new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password
    }),
    {
      auth: {
        username: CLIENT_ID,
        password: SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data;
}

module.exports = { registerUser, loginUser };