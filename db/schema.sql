DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


create TABLE department(
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name  VARCHAR(30) 
);

create TABLE role(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title  VARCHAR(30),
  salary DECIMAL(10,2),
  department_id  INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

create TABLE employee(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30)NOT NULL,
  last_name VARCHAR(30)NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) 
);
