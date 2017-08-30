function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getSqlContentMap = require('./util/get-sql-content-map');
const { query } = require('./util/db');

// 打印脚本执行日志
const eventLog = function (err, sqlFile, index) {
  if (err) {
    console.error(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败!`);
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功!`);
  }
};

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap();

// 执行建表sql脚本
const createAllTables = (() => {
  var _ref = _asyncToGenerator(function* () {
    for (let key in sqlContentMap) {
      let sqlShell = sqlContentMap[key];
      let sqlShellList = sqlShell.split(';');

      for (let [i, shell] of sqlShellList.entries()) {
        if (shell.trim()) {
          let result = yield query(shell);
          if (result.serverStatus * 1 === 2) {
            eventLog(null, key, i);
          } else {
            eventLog(true, key, i);
          }
        }
      }
    }
  });

  return function createAllTables() {
    return _ref.apply(this, arguments);
  };
})();

createAllTables();