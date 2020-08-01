CREATE SCHEMA learn-graphql IF NOT EXISTS

SET search_path TO "learn-graphql";

CREATE TABLE IF NOT EXISTS departments (
    id SERIAL UNIQUE NOT NULL,
    name varchar(128) UNIQUE NOT NULL
);

INSERT INTO departments ("name") VALUES ('R&D'), ('Services'), ('DevOps'), ('HR'), ('Sales');

CREATE TABLE IF NOT EXISTS locations (
    id SERIAL UNIQUE NOT NULL,
    country varchar(128) NOT NULL,
    city varchar(128) NOT NULL
);

INSERT INTO locations ("country", "city") VALUES 
('India', 'Chennai'), 
('UK', 'London'), 
('Australia', 'Sydney'), 
('Australia', 'Melbourne'), 
('USA', 'Newyork');

CREATE TABLE IF NOT EXISTS designations (
    id SERIAL UNIQUE NOT NULL,
    name varchar(128) UNIQUE NOT NULL
);

INSERT INTO designations ("name") VALUES 
('Software Engineer'), 
('Senior Software Engineer'), 
('Test Engineer'), 
('Manager'), 
('Sales Engineer'),
('DevOps Engineer'),
('HR');

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL UNIQUE NOT NULL,
    name varchar(128) NOT NULL,
    email varchar(128) NOT NULL,
    department int REFERENCES departments(id),
    location int REFERENCES locations(id),
    reporting int REFERENCES employees(id),
    designation int REFERENCES designations(id)
);

