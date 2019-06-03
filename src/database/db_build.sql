BEGIN;

DROP TABLE IF EXISTS employee, role, job;

CREATE TABLE IF NOT EXISTS employee (
  emp_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_num INTEGER,
  job_id INTEGER
);

INSERT INTO employee (first_name, last_name, phone_num, job_id) VALUES
('Mickle', 'Kohen', 0546685746, 5284);
INSERT INTO employee (first_name, last_name, phone_num, job_id) VALUES
('Ron', 'Moshi', 0529974325, 6348);
INSERT INTO employee (first_name, last_name, phone_num, job_id) VALUES
('Maya', 'Golan', 0504253659, 4685);


CREATE TABLE IF NOT EXISTS role (
job_id INTEGER PRIMARY KEY,
role VARCHAR(100) NOT NULL,
selary INTEGER,
mgr_id INTEGER,
FOREIGN KEY (mgr_id) REFERENCES employee(emp_id)

);


INSERT INTO role (job_id, role, selary, mgr_id) VALUES
('5284', 'engineer', '10000', '1');
INSERT INTO role (job_id, role, selary, mgr_id) VALUES
('6348', 'designer', '12000','2');
INSERT INTO role (job_id, role, selary, mgr_id) VALUES
('4685', 'developer', '14000','3');


CREATE TABLE IF NOT EXISTS job (
seniority INTEGER,
boss VARCHAR(100) NOT NULL,
status VARCHAR(100) NOT NULL,
job_id INTEGER,
FOREIGN KEY (job_id) REFERENCES role(job_id)

);

INSERT INTO job (seniority, boss, status) VALUES
('5', 'Beni', 'Working on');
INSERT INTO job (seniority, boss, status) VALUES
('7', 'Roon', 'Working on');
INSERT INTO job (seniority, boss, status) VALUES
('9', 'Semon', 'Not working');


CREATE TABLE IF NOT EXISTE users (
  id SERIAL PRIMARY KEY,
  email INTEGER,
  password INTEGER
);

INSERT INTO users (email, password) VALUES ('enasskmal@gmail.com', '123456oo');
INSERT INTO users (email, password) VALUES ('loreenhamdan@gmail.com', '4587kj');

COMMIT;
