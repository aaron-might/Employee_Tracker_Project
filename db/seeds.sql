INSERT INTO departments(department_name)
VALUES 
('Management'),
('Finance'),
('Quality Control'),
('Warehouse'),
('Sales'),
('Engineering'),
('Marketing');

INSERT INTO roles (title,salary,department_id)
VALUES 
('Regional Manager',102000,1),
('Finance Rep',102000,2),
('Quality control Rep',70000,3),
('Warehouse Rep',45000,8),
('Sales Rep',68000,9),
('Engineering Rep',10000,6),
('Marketing Rep',70600,7);

INSERT INTO employees(first_name,last_name,role_id)
VALUES 
('Ryan','John',1),
('John','mann',2),
('Laurence','Duplessis',7),
('julia','Deloitte',9),
('Francine','Oreal',3),
('Alex','Johnson',6),
('Jacqueline','batt',1);

UPDATE `employee_db`.`employee` 
SET `manager_id` ='1'
WHERE (`id`>'1');
