-- migrate:up
CREATE TABLE comments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  post_id int NOT NULL,
  content varchar(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down

