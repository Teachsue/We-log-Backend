-- migrate:up
ALTER TABLE `posts` ADD FOREIGN KEY (`boardType_id`) REFERENCES `boardTypes`(id);
ALTER TABLE `posts` ADD FOREIGN KEY (`status_id`) REFERENCES `post_status`(id);
ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
ALTER TABLE `post_like` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `post_like` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(id);

-- migrate:down

