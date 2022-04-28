USE `Messaging-App`;








-- VIEWS
-- The view of all the group chatboxes, their ids, their names and the last text message of that user
create view grp_chatboxes as
SELECT distinct Chatbox.id, Chatbox.group_id, `Group`.name, 
Message.msg_text from Chatbox, Chatbox_msg, `Group`, Message where 
Chatbox_msg.chatbox_id = chatbox.id and Chatbox_msg.user_id = 1 and `Group`.id = 
Chatbox.group_id and Chatbox.last_message_id=Message.id;
select * from grp_chatboxes;

-- Perosnal profile page of the user
create view personal_info as
SELECT firstname, lastname, profilepic, bio, emailid, theme, wallpaper
FROM user where `user`.id = 1;
select * from personal_info;

-- View of the one2one messages, the name of the person and the last text msg.
create view one2one as
SELECT distinct Chatbox.id, `User`.firstname, One_to_One.user_id, Message.msg_text 
from Chatbox, Chatbox_msg, `User`, One_to_One, Message where Chatbox_msg.chatbox_id = chatbox.id and 
Chatbox_msg.user_id = 1 and chatbox.group_id is null and chatbox.id = One_to_One.chatbox_id and 
`User`.id = One_to_One.user_id and One_to_One.user_id != 1 and Chatbox.last_message_id=Message.id;
select * from one2one;







-- GRANTS
-- Enable privileges to be granted to or removed from other accounts. Levels: Global, database, table, routine, proxy.
-- creating a user
create user 'dev'@'localhost' identified by 'dev';

-- First grant gives database level access on viewing and quering.
grant select on *.* to 'dev'@'localhost';
-- Second grant gives table level access to Insert new users.
grant insert on `User` to 'dev'@'localhost';







-- Indexing
CREATE INDEX Message_idx_created_at
  ON Message(created_at);
CREATE INDEX Message_idx_id
  ON Message(id);
CREATE INDEX Chatboxmessage_idx_userid
  ON Chatbox_msg(user_id);
CREATE INDEX Chatboxmessage_idx_chatboxid
  ON Chatbox_msg(chatbox_id);
CREATE INDEX Chatboxmessage_idx_msgid
  ON Chatbox_msg(msg_id);
CREATE INDEX starredmsgs_idx_msgid
  ON starred_msgs(msg_id);
CREATE INDEX starredmsgs_idx_userid
  ON starred_msgs(user_id);
ALTER TABLE `one_to_one` ADD INDEX `one_to_one_idx_user_id` (`user_id`);
ALTER TABLE `one_to_one` ADD INDEX `one_to_one_idx_chatbox_id_user_id` (`chatbox_id`,`user_id`);
ALTER TABLE `message` ADD INDEX `message_idx_id_created_at` (`id`,`created_at`);
ALTER TABLE `starred_msgs` ADD INDEX `starred_msgs_idx_msg_id` (`msg_id`);









-- QUERIES & TRIGGERS

-- Retrieve the msgs from group
SELECT Message.* FROM Message, Chatbox_msg
WHERE Chatbox_msg.chatbox_id = 1 AND Chatbox_msg.msg_id= Message.id ORDER BY Message.created_at;

-- Retrieve all the groups associated with a user with their names and last text msgs.
SELECT distinct Chatbox.id, Chatbox.group_id, `Group`.name, 
Message.msg_text from Chatbox, Chatbox_msg, `Group`, Message where 
Chatbox_msg.chatbox_id = chatbox.id and Chatbox_msg.user_id = 1 and `Group`.id = 
Chatbox.group_id and Chatbox.last_message_id=Message.id;

-- Retrieve all the starred msgs
SELECT m.msg_text 
    FROM
        starred_msgs AS sm,
        message m 
    WHERE
        sm.msg_id = m.id and m.user_id = 1
    ORDER BY
        m.created_at DESC;

-- Block a user
insert into blocked_users values (1, 84);

-- When a user leaves a group, we check if the user is an admin or not, if the user leaving the group is an admin, then the link between the group_id and admin is removed.
-- TRIGGER
create trigger remove_userid_grp_id 
after delete 
on `group_members`
for each row 
DELETE from `admin` as ad where ad.group_id = 1 and ad.user_id = 1;

SET FOREIGN_KEY_CHECKS=0;
DELETE from `group_members` as gm where gm.group_id = 1 and gm.user_id = 1;
SET FOREIGN_KEY_CHECKS=1;

-- When a new group is created, add that user as a group member as well as the admin of the group
-- TRIGGER
create trigger add_userid_grp_id 
after insert 
on `group_members`
for each row 
insert into `admin` values (1, 1);

SET FOREIGN_KEY_CHECKS=0;
insert into `group_members` values (1, 1);
SET FOREIGN_KEY_CHECKS=1;

-- When a user creates a group, a chatbox should be created for that user.
-- TRIGGER
create trigger make_chatbox 
after insert 
on `group_members`
for each row 
insert into `chatbox` values (999, 2, 999);

select * from chatbox;

SET FOREIGN_KEY_CHECKS=0;
insert into `group_members` values(999, 121);
SET FOREIGN_KEY_CHECKS=1;

-- When a message a created, the message should be added into the chatbox;
-- TRIGGER
select * from chatbox_msg;
create trigger add_msg_to_chatbox 
after insert 
on message
for each row 
insert into `chatbox_msg` values (1, 1, 1999);

insert into message values (1999, 1, '2021-05-13 05:00:50', null, 'abcd', null);

-- Search among multimedia
SELECT message.* FROM message, `User` 
WHERE `User`.id = 1 AND `User`.id = Message.user_id and media_url like "%a%";

-- Sorting Files/Images
SELECT cm.chatbox_id, cm.msg_id, m.user_id, m.created_at, m.file_url from Chatbox_msg as cm, Message as m
WHERE cm.chatbox_id = 1 AND m.id = cm.msg_id AND file_url is not null 
ORDER BY m.created_at desc;

-- Retrieve the user's last seen
SELECT
        DISTINCT `user`.id,
        `user`.last_login 
    FROM
        `user` 
    WHERE
        EXISTS (
            SELECT
                1 
            FROM
                one_to_one 
            WHERE
                (
                    one_to_one.user_id != 80 
                    AND EXISTS (
                        SELECT
                            1 
                        FROM
                            one_to_one AS one_to_one1 
                        WHERE
                            (
                                one_to_one1.user_id = 80
                            ) 
                            AND (
                                one_to_one.chatbox_id = one_to_one1.chatbox_id
                            )
                    )
                ) 
                AND (
                    `user`.id = one_to_one.user_id
                )
            );

