const mysql = require('mysql2');
const mysqlDatasets = require('../Data/MysqlDatasets');

class MysqlService {
    constructor(sqlLogsEnabled = false) {
        this.sqlLogsEnabled = sqlLogsEnabled;
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            port: 3307,
            database: "main_db"
        });
    }

    setup() {
        const self = this; // Сохраняем значение this

        this.con.connect(function (err) {
            if (err) throw err;
            self._sqlLog("Connected");
            self._sqlLog(mysqlDatasets.createUsersTableIfNotExists);
            self.con.query(mysqlDatasets.createUsersTableIfNotExists, function (err, result) {
                if (err) throw err;
                self._sqlLog(result);
            });

            self._sqlLog(mysqlDatasets.createFoldersTableIfNotExists);
            self.con.query(mysqlDatasets.createFoldersTableIfNotExists, function (err, result) {
                if (err) throw err;
                self._sqlLog(result);
            });

            self._sqlLog(mysqlDatasets.createFolderMembersTableIfNotExists);
            self.con.query(mysqlDatasets.createFolderMembersTableIfNotExists, function (err, result) {
                if (err) throw err;
                self._sqlLog(result);
            });
        });
    }

    _sqlLog(logContent) {
        if (this.sqlLogsEnabled) console.log(logContent);
    }

    createUser(userData) {
        return new Promise((resolve, reject) => {
            this.con.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }

                const query = "INSERT INTO Users (username) VALUES (?)";
                this.con.query(query, [userData.username], (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        });
    }

    getUsersWithStringInName(containsString) {
        return new Promise((resolve, reject) => {
            this.con.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }

                const query = "SELECT * FROM Users WHERE username LIKE '%"+containsString+"%'";
                this.con.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        });
    }
}

module.exports = {MysqlService};