DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


create TABLE departments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name  VARCHAR(30) 
);

create TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title  VARCHAR(30),
  salary DECIMAL(10,2),
  department_id  INT,
  FOREIGN KEY (id) REFERENCES departments(id)
);

create TABLE employees(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30)NOT NULL,
  last_name VARCHAR(30)NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id) 
);
SELECT * FROM roles;
