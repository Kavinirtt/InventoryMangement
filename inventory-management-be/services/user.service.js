const db = require('../config/db');

exports.createUser = (username, password, role_id) => {
    const insertSql = 'INSERT INTO user (username, password, role_id) VALUES (?, ?, ?)';
    const selectSql = 'SELECT * FROM user WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(insertSql, [username, password, role_id], (err, results) => {
            if (err) return reject(err);

            const insertedId = results.insertId;
            db.query(selectSql, [insertedId], (err, rows) => {
                if (err) return reject(err);
                if (rows.length === 0) return reject(new Error('User not found after insert'));
                resolve(rows[0]);
            });
        });
    });
};

exports.verifyUser = (username) => {
    const sql = 'SELECT * FROM user WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};



