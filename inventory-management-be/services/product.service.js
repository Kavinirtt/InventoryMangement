const db = require('../config/db');

exports.createProduct = (product) => {
    const sql = `
    INSERT INTO product_list (name, product_code, quantity, price, description, created_by) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        product.name,
        product.product_code,
        product.quantity,
        product.price,
        product.description,
        product.created_by
    ];
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM product_list WHERE deleted_at IS NULL`;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


exports.updateProduct = (id, data) => {
    const sql = `
    UPDATE product_list SET 
      name=?, product_code=?, quantity=?, price=?, description=?, updated_by=? 
    WHERE id=?`;
    const values = [
        data.name,
        data.product_code,
        data.quantity,
        data.price,
        data.description,
        data.updated_by,
        id
    ];
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.deleteProduct = (id, deleted_by) => {
    const sql = `UPDATE product_list SET deleted_at=NOW(), deleted_by=? WHERE id=?`;
    return new Promise((resolve, reject) => {
        db.query(sql, [deleted_by, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
