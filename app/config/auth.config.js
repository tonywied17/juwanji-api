require('dotenv').config({ path: '/home/tonewebdesign/envs/juwanji/.env' });

module.exports = {
  secret: process.env.AUTH_SECRET,
};
