require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
