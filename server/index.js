const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", async (req, res) => {
    res.json({ status: "Up and Working..." });
});

app.use(bodyParser.json());

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Messaging-App",
});

let msg_id = 1000;

app.post("/register", (res, req) => {
    const fname = req.query.fname;
    const lname = req.query.lname;
    const email = req.query.email;
    const password = req.query.password;
    let today = new Date();
    let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;

    const query = `INSERT INTO 'User' ('firstname', 'lastname', 'profilepic', 'bio', 'emailid', 'password', 'last_login', 'theme', 'wallpaper') VALUES ('${fname}', '${lname}', 'http://lorempixel.com/640/480/', 'Ab voluptas at consectetur deleniti natus libero debitis. Veritatis quia quia a exercitationem eos voluptatem quae. Labore molestias dolore delectus molestiae ut illo.', '${email}', '${password}', '${dateTime}', ' dark', 'http://via.placeholder.com/640x640');`;

    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
        // connected!
    });
});

app.get("/getGroupChatboxes", (req, res) => {
    const user_id = req.query.user_id;

    const query = `SELECT distinct Chatbox.id, Chatbox.group_id, \`Group\`.name, Message.msg_text from Chatbox, Chatbox_msg, \`Group\`, Message where Chatbox_msg.chatbox_id = chatbox.id and Chatbox_msg.user_id = ${user_id} and \`Group\`.id = Chatbox.group_id and Chatbox.last_message_id=Message.id;`;

    connection.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.get("/getIndiChatboxes", (req, res) => {
    const user_id = req.query.user_id;

    const query = `SELECT distinct Chatbox.id, \`User\`.firstname, One_to_One.user_id, Message.msg_text from Chatbox, Chatbox_msg, \`User\`, One_to_One, Message where Chatbox_msg.chatbox_id = chatbox.id and Chatbox_msg.user_id = ${user_id} and chatbox.group_id is null and chatbox.id = One_to_One.chatbox_id and \`User\`.id = One_to_One.user_id and One_to_One.user_id != ${user_id} and Chatbox.last_message_id=Message.id Limit 1;`;

    connection.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.get("/viewMsgs", (req, res) => {
    const chatbox_id = req.query.chatbox_id;

    const query = `SELECT Message.* from Message, Chatbox_msg
    WHERE Chatbox_msg.chatbox_id=${chatbox_id} and Chatbox_msg.msg_id= Message.id ORDER BY Message.created_at;`;

    console.log(query);

    connection.query(query, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.get("/lastSeen", (req, res) => {
    const user_id = req.query.user_id;

    const query = `SELECT
    DISTINCT \`user\`.id,
    \`user\`.last_login 
FROM
    \`user\` 
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
                            one_to_one1.user_id = ${user_id}
                        ) 
                        AND (
                            one_to_one.chatbox_id = one_to_one1.chatbox_id
                        )
                )
            ) 
            AND (
                \`user\`.id = one_to_one.user_id
            )
        )
        LIMIT 1;`;

    console.log(query);

    connection.query(query, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.post("/sendMsg", (req, res) => {
    const msg = req.query.msg;
    const user_id = req.query.user_id;
    const chatbox_id = req.query.chatbox_id;

    let today = new Date();
    let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;

    const currmsg_id = msg_id++;

    const query1 = `UPDATE chatbox SET last_message_id = ${currmsg_id} WHERE id = ${chatbox_id};`;

    const query2 = `insert into \`chatbox_msg\` values (${user_id}, ${chatbox_id}, ${currmsg_id});`;

    const query3 = `INSERT INTO Message (id, user_id, created_at, media_url, msg_text, file_url) VALUES (${currmsg_id}, ${user_id}, ${dateTime}, null, ${msg}, NULL);`;

    connection.query(query1, (error, results) => {
        if (err) {
            console.log(error);
            res.status(400).send(err);
        } else {
            connection.query(query2, (error, results) => {
                if (err) {
                    console.log(error);
                    res.status(400).send(err);
                } else {
                    connection.query(query3, (error, results) => {
                        if (err) {
                            console.log(error);
                            res.status(400).send(err);
                        } else {
                            res.json(results);
                        }
                    });
                }
            });
        }
    });
});
