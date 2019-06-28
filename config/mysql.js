// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "127.0.0.1",
//     user: "root",
//     password: "123456",
//     database: "node-test"
//   }
// });

const pool = require("mysql").createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "node-test"
});

// module.exports = { knex };

module.exports = pool;
