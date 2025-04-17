const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'your_connection_string_here', // Replace with your actual connection string
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
