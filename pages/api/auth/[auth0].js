// pages/api/auth/[...auth0].js

const { handleAuth, handleLogin } = require('@auth0/nextjs-auth0');
const { NextApiRequest, NextApiResponse } = require('next');

module.exports = handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          redirect_uri: "http://localhost:3000/Home",
        },
      });
    } catch (e) {
      res.status(400).end(e.message);
    }
  },
});
