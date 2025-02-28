const pg = require('pg');

const config = {
  user: 'postgres', //user and password fields required for running PostgreSQL on Windows
  password: 'placeholder', //not actual password for security reasons
  database: 'awesome_reads', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to postgres");
});

pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

module.exports = pool;