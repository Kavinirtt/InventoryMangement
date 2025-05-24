-- Create role_master table
CREATE TABLE role_master (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50)
);

-- Create user table
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role_master(id)
);

-- Create product_list table
CREATE TABLE product_list (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    product_code VARCHAR(50),
    quantity INT,
    price DECIMAL(10,2),
    description TEXT,
    created_at DATETIME,
    created_by INT,
    updated_at DATETIME,
    updated_by INT,
    deleted_at DATETIME,
    deleted_by INT,
    FOREIGN KEY (created_by) REFERENCES user(id),
    FOREIGN KEY (updated_by) REFERENCES user(id),
    FOREIGN KEY (deleted_by) REFERENCES user(id)
);

-- Insert roles
INSERT INTO role_master (id, role_name) VALUES 
(1, 'Admin'),
(2, 'Staff');

-- Insert users with hashed password 'Pass@123'
INSERT INTO user (id, username, password, role_id) VALUES
(1, 'VGadmin', '$2b$10$KIXxgVFXhIFVmlTVwDAzQOYcxyj9MbnxFlCFQ7Drc1zR4ttVCT9Ta', 1),
(2, 'VGstaff', '$2b$10$KIXxgVFXhIFVmlTVwDAzQOYcxyj9MbnxFlCFQ7Drc1zR4ttVCT9Ta', 2);

-- Insert products created only by Admin (id: 1)
INSERT INTO product_list (
    name, product_code, quantity, price, description, created_at, created_by,
    updated_at, updated_by, deleted_at, deleted_by
) VALUES
('Laptop', 'LP1001', 10, 799.99, 'Dell Latitude Series', NOW(), 1, NOW(), 1, NULL, NULL),
('Mouse', 'MS2002', 50, 15.49, 'Wireless Mouse', NOW(), 1, NOW(), 1, NULL, NULL),
('Keyboard', 'KB3003', 25, 25.00, 'Mechanical Keyboard', NOW(), 1, NOW(), 1, NULL, NULL);

