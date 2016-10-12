CREATE TABLE post
(
    post_uuid CHAR(36) NOT NULL,
    post_hash CHAR(13) NOT NULL,
    post_tags TEXT NULL,
    post_title VARCHAR(255) NULL,
    post_brief VARCHAR(255) NULL,
    post_content LONGTEXT NULL,
    post_time DATETIME NULL,
    post_read INT NOT NULL DEFAULT 0,
    post_up INT NULL,
    post_down INT NULL,
    post_hidden BOOLEAN NOT NULL DEFAULT 0,
    post_comment INT NOT NULL DEFAULT 0,
    PRIMARY KEY (post_uuid)
);

-- CREATE TABLE tagmap
-- (
--     tagmap_id INT NOT NULL AUTO_INCREMENT,
--     tagmap_pids TEXT NULL,
--     PRIMARY KEY (tagmap_id)
-- );

CREATE TABLE tag
(
    tag_uuid CHAR(36) NOT NULL,
    tag_name VARCHAR(255) NULL,
    tag_count INT DEFAULT 1,
    tag_puuids TEXT NULL,
    PRIMARY KEY (tag_uuid)
);

CREATE TABLE comment
(
    comment_id INT NOT NULL AUTO_INCREMENT,
    comment_pid INT NULL,
    comment_title VARCHAR(255) NULL,
    comment_time DATETIME NULL,
    comment_content TEXT NULL,
    comment_email VARCHAR(255) NULL,
    comment_link VARCHAR(255) NULL,
    comment_up INT NULL,
    comment_down INT NULL,
    comment_hidden BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (comment_id)
);

-- 初始化tag
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('0', 'Node.js', '0');
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('1', 'HTML5', '0');
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('2', 'CSS3', '0');
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('3', 'JavaScript', '0');
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('4', 'Python', '0');
-- INSERT INTO `board`.`tag` (`tag_id`, `tag_name`, `tag_count`) VALUES ('5', 'Swift', '0');
