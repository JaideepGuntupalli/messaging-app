USE `Messaging-App`;

-- Assuming Chatbox-ID:1 & User id: 1 when needed

-- Retrieves recent chatboxes by sorting.
SELECT cm.chatbox_id, c.last_message_id, m.created_at FROM Chatbox_msg as cm, Chatbox as c, Message as m
WHERE cm.user_id = 1 AND cm.chatbox_id = c.id AND c.last_message_id=m.id ORDER BY m.created_at desc;

-- Sorting Files/Images
SELECT cm.chatbox_id, cm.msg_id, m.user_id, m.created_at, m.file_url from Chatbox_msg as cm, Message as m
WHERE cm.chatbox_id = 1 AND m.id = cm.msg_id AND file_url is not null;

-- Retrieve msgs from chatbox
-- Group
SELECT Message.* FROM Message, Chatbox_msg
WHERE Chatbox_msg.chatbox_id = 1 AND Chatbox_msg.msg_id= m.id ORDER BY Message.created_at;
-- One to One
SELECT Message.* from Message, Chatbox_msg
WHERE Chatbox_msg.chatbox_id = 31 and Chatbox_msg.msg_id= Message.id ORDER BY Message.created_at;

-- Search among messages
SELECT message.* FROM message, `User` WHERE `User`.id = 1 AND `User`.id = Message.user_id and msg_text like "%do%";

-- Other user's last seen
select distinct id, last_login from `user` where id in (
	select user_id from one_to_one where user_id != 80 and chatbox_id in (select chatbox_id from one_to_one where user_id = 80)
);

-- Updating User Details
-- Profile Picture
UPDATE User SET User.profilepic = "https://www.cardekho.com/carmodels/Lamborghini/Lamborghini_Aventador"
WHERE User.id = 1;
-- First Name
UPDATE User SET User.firstname = "John"
WHERE User.id = 1;
-- Last Name
UPDATE User SET User.lastname = "Doe"
WHERE User.id = 1;

-- Updating Group Details
UPDATE `Group`
SET `Group`.profile_pic = "https://www.cardekho.com/carmodels/Lamborghini/Lamborghini_Aventador"
WHERE `Group`.id = 1;

-- Removing Admin
DELETE FROM Admin where Admin.user_id = 1 AND `Group`.id = 1;

-- Deleting users from group
DELETE FROM Group_Members
WHERE Group_Members.group_id = 1 AND Group_Members.user_id = 1;

-- Making a New Group assuming user_id = 1 made the group 
INSERT INTO `Group` (`id`, `name`, `profile_pic`, `bio`, `owner_id`) VALUES (31, 've', 'http://lorel.com/640/480/', 'Repre sed voluptas.', 1);
INSERT INTO `Chatbox` (`id`, `last_message_id`, `group_id`) VALUES (121, null, 31);
INSERT INTO `Admin` (`user_id`, `group_id`) VALUES (1, 31);

-- Deleting the Group
DELETE from `Group` where id = 1; 
DELETE from `Group_Members`where group_id = 1;

-- Leaving the Group
DELETE from `group_members` gm
WHERE gm.group_id = 2 AND gm.user_id = 32;

-- Adding a New member to the group
INSERT INTO Group_Members (group_id, user_id) values (1, 81);


