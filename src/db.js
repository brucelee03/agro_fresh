const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://Vegies%20and%20Fruits_owner:npg_SUhw4QazW0JA@ep-tiny-brook-a45pl752-pooler.us-east-1.aws.neon.tech/Vegies%20and%20Fruits?sslmode=require', // Replace with your actual connection string
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
