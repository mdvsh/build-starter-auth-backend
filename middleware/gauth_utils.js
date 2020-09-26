var { google } = require("googleapis");
require("dotenv").config();

const gauthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:8000/gauth/success",
};

function createConnection() {
  return new google.auth.OAuth2(
    gauthConfig.clientId,
    gauthConfig.clientSecret,
    gauthConfig.redirectUri
  );
}

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
}

function authUrl() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

function getGPlusApi(auth) {
  return gooogle.plus({ version: "v1", auth });
}

function getGoogleLoginData(access_code) {
  const data = auth.getToken(access_code);
  const tokens = data.tokens;
  const auth = createConnection();
  auth.setCredentials(tokens);
  const gplus = getGPlusApi(auth);
  const user = gplus.people.get({ userId: "me" });
  const gid = user.data.id;
  const gmail =
    user.data.emails && user.data.emails.length && user.data.emails[0].value;
  return {
    id: gid,
    email: gmail,
    token: tokens,
  };
}

module.exports = {gauthUrl: authUrl, loginData: getGoogleLoginData}