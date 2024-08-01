INSERT INTO departments (id, name) VALUES
(101, 'Engineering'),
(102, 'Finance'),
(103, 'Legal'),
(104, 'Sales');

INSERT INTO roles (id, title, salary, department) VALUES 
(201, 'Sales Lead', 40000, 104),
(202, 'Salesperson', 35000, 104),
(203, 'Lead Engineer', 200000, 101),
(204, 'Software Engineer',100000, 101),
(205, 'Account Manager', 70000, 102), 
(206, 'Accountant', 80000, 102),
(207, 'Legal Team Lead', 90000, 103),
(208, 'Lawyer', 150000, 102),
(209, 'Customer Service', 45000, 104);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES 
(301, 'Yuga', 'Aoyama', 209, 301),
(302, 'Mina', 'Ashido', 209, 302),
(303, 'Tsuyu', 'Asui', 208, 303),
(304, 'Tenya', 'Ida', 208, 304),
(305, 'Ochaco', 'Uraraka', 207, 305),
(306, 'Mashirao', 'Ojiro', 207, 306),
(307, 'Denki', 'Kaminari', 206, 307),
(308, 'Eijiro', 'Kirishima', 206, 308),
(309, 'Koji', 'Koda', 205, 309),
(310, 'Rikido', 'Sato', 205, 310),
(311, 'Mezo', 'Shoji', 204, 311),
(312, 'Kyoka', 'Jiro', 204, 312),
(313, 'Hanta', 'Sero', 203, 313),
(314, 'Fumikage', 'Tokoyami', 203, 314),
(315, 'Shoto', 'Todoroki', 202, 315),
(316, 'Toru', 'Hagakure', 202, 316),
(317, 'Katsuki', 'Bakugo', 201, 317),
(318, 'Izuku', 'Midoriya', 201, 318),
(319, 'Minoru', 'Mineta', 209, 319),
(320, 'Momo', 'Yaoyorozu', 209, 320);