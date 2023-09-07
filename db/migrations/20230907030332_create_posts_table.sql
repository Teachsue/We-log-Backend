-- migrate:up
CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  post_image VARCHAR(1000) NULL,
  thumbnail_image VARCHAR(1000) NULL,
  boardType_id int NOT NULL,
  tag varchar(100),
  status_id int NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP

);

-- migrate:down

