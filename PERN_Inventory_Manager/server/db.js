///Connecting Database
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "12344321",
    host: "localhost",
    port: 5432,
    database: "inventory2"
});

module.exports = pool;