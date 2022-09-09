INSERT INTO Department(name)
VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Quality Control'),
('Office Management'),
('Accounting');

INSERT INTO Role(title, salary, did_FK)
VALUES
('Regional Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 4),
('Warehouse Worker', 45000, 3),
('Receptionist', 47000, 6),
('Accountant', 89000, 7);

INSERT INTO Employee(first_name, last_name, rid_FK) 
VALUES
('Michael', 'Scott', 1),
('Pam', 'Beesly', 5),
('Jim', 'Halpert', 2),
('Toby', 'Flenderson', 3),
('Stanley', 'Hudson', 6),
('Darryl', 'Philbin', 3);