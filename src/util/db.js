const mysql = require('mysql');
const dataConfig = require('./../config');
const config = dataConfig.database;

const pool = mysql.createPool({
  host     :  config.HOST,
  user     :  config.USERNAME,
  password :  config.PASSWORD,
  database :  config.DATABASE,
})

let query = function (sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release()
        })
      }
    })
  })
}

const create = (table, info) => {
  const _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, info]);
}

const select = (table, keys, test) => {
  const _sql = test ? "SELECT ?? FROM ?? WHERE name = ?" : "SELECT ?? FROM ??";
  return query(_sql, [keys, table, test]);
}

const deleteSth =  (table, id) => {
  const _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
}

const update = (table, info, id) => {
  const _sql = "UPDATE ?? SET nick = ?, detail_info = ? WHERE id = ?";
  return query(_sql, [table, info.nick, info.detail_info, id]);
}


module.exports = {
  query,
  create,
  select,
  deleteSth,
  update,
}