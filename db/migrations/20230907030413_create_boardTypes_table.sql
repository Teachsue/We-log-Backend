-- migrate:up
CREATE TABLE boardTypes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  content varchar(10)
);

-- migrate:down

