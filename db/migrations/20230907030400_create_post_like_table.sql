-- migrate:up
CREATE TABLE post_like (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id int NOT NULL,
  user_id int NOT NULL,
  CONSTRAINT unique_user_post UNIQUE (user_id, post_id)
);

-- migrate:down

