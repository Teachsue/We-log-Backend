-- migrate:up
CREATE TABLE post_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  content varchar(10)
);

-- migrate:down

