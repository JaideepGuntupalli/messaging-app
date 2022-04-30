import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SentMsg({ msg }) {
    return (
        <section className="flex flex-col items-end">
            <section className="my-6 max-w-[75%] w-fit text-gray-800 bg-[#FFB923] rounded-tl-xl rounded-b-xl p-4">
                {msg}
            </section>
        </section>
    );
}

function ReceivedMsg({ msg }) {
    return (
        <section className="my-6 max-w-[75%] w-fit text-white bg-gray-600 rounded-tr-xl rounded-b-xl p-4">
            <p className="inline">{msg}</p>
        </section>
    );
}

function Chatwindow() {
    const params = useParams();
    const user_id = params.user_id;
    const chatbox_id = params.id;

    const [msgs, setMsgs] = useState([]);
    useEffect(() => {
        const url = `http://localhost:8080/viewMsgs?chatbox_id=${chatbox_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => setMsgs(response));
    });

    const [lastseen, setLastseen] = useState([]);
    useEffect(() => {
        const url = `http://localhost:8080/lastSeen?user_id=${user_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => setLastseen(response));
    });

    let seentime = lastseen[0].last_login;

    const [msg, setMsg] = useState("");

    let newMsg = {
        id: 690,
        user_id: parseInt(user_id),
        created_at: "2021-03-01T04:47:56.000Z",
        media_url: null,
        msg_text: msg,
        file_url: null,
    };

    const sendMsg = (e) => {
        e.preventDefault();
        console.log(newMsg);
        console.log(msgs);
        msgs.push(newMsg);
        setMsgs(msgs);
        console.log(msgs);
    };

    return (
        <div className="w-[70%] overflow-y-auto h-screen bg-gray-900">
            <section className="px-6 pb-20" id="msgbox">
                {msgs.map((msg) => {
                    if (msg.user_id.toString() === user_id) {
                        return <SentMsg key={msg.id} msg={msg.msg_text} />;
                    } else {
                        return <ReceivedMsg key={msg.id} msg={msg.msg_text} />;
                    }
                })}
            </section>
            <section>
                <form
                    className="fixed bottom-0 w-[70%] flex justify-between p-3 px-4 items-center bg-gray-700 border-[1px] border-gray-200"
                    onSubmit={sendMsg}
                >
                    <p className="text-white font-bold text-center">
                        Last seen at {`${seentime}`}
                    </p>
                    <input
                        class="text-white placeholder:text-slate-400 block bg-gray-500 w-full border border-slate-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-slate-300 focus:ring-[#FFB923] focus:ring-1 sm:text-lg"
                        type="text"
                        name="msg"
                        id="msg"
                        placeholder="Type a message"
                        required
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Send!"
                        className="bg-yellow-500 px-4 py-2 rounded-md text-xl hover:bg-yellow-600 ml-4"
                    />
                </form>
            </section>
        </div>
    );
}

export default Chatwindow;
