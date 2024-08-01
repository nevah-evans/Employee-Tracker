INSERT INTO departments (name) VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles (title, salary, department) VALUES 
('Sales Lead', 40000, 4),
('Salesperson', 35000, 4),
('Lead Engineer', 200000, 1),
('Software Engineer',100000, 1),
('Account Manager', 70000, 2), 
('Accountant', 80000, 2),
('Legal Team Lead', 90000, 3),
('Lawyer', 150000, 2),
('Customer Service', 45000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Yuga', 'Aoyama', 9, 1),
('Mina', 'Ashido', 9, 2),
('Tsuyu', 'Asui', 8, 3),
('Tenya', 'Ida', 8, 4),
('Ochaco', 'Uraraka', 7, 5),
('Mashirao', 'Ojiro', 7, 6),
('Denki', 'Kaminari', 6, 7),
('Eijiro', 'Kirishima', 6, 8),
('Koji', 'Koda', 5, 9),
('Rikido', 'Sato', 5, 10),
('Mezo', 'Shoji', 4, 11),
('Kyoka', 'Jiro', 4, 12),
('Hanta', 'Sero', 3, 13),
('Fumikage', 'Tokoyami', 3, 14),
('Shoto', 'Todoroki', 2, 15),
('Toru', 'Hagakure', 2, 16),
('Katsuki', 'Bakugo', 1, 17),
('Izuku', 'Midoriya', 1, 18),
('Minoru', 'Mineta', 9, 19),
('Momo', 'Yaoyorozu', 9, 20);