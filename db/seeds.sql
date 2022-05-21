INSERT INTO departments (name)
VALUES
  ('Marketing'),
  ('Human Resources'),
  ('IT');

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Manager', '50000.00', 2),
  ('Agent', '45000.00', 1),
  ('Support', '30000.00', 3);


INSERT INTO employees (first_name, last_name, role_id)
VALUES
  ('James', 'Walsh', 1),
  ('Jack', 'Christianson', 2),
  ('Robert', 'Warner', 3);