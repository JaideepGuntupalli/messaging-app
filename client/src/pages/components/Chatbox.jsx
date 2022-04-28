import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndiChatPreview({ id, user_id, name, last_msg, url2 }) {
    const url = `/chat/${user_id}/${id}`;
    return (
        <Link
            to={url}
            className="flex gap-3 px-2 py-3 bg-gray-800 hover:bg-gray-700 cursor-pointer border-[0.5px] border-gray-200"
        >
            <div>
                <img src={url2} alt="profile" className="rounded-full h-12" />
            </div>
            <div>
                <p className="text-xl text-[#FFB923] font-bold">{name}</p>
                <p className="text-sm overflow-hidden text-ellipsis text-white">
                    {last_msg}
                </p>
            </div>
        </Link>
    );
}

function Chatbox({ user_id }) {
    const [grpdata, setGrpData] = useState([]);
    const [inddata, setIndData] = useState([]);
    useEffect(() => {
        const url = `http://localhost:8080/getGroupChatboxes?user_id=${user_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => setGrpData(response));
    });
    useEffect(() => {
        const url = `http://localhost:8080/getIndiChatboxes?user_id=${user_id}`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => setIndData(response));
    });
    let res = 25;
    return (
        <div>
            <h2 className="text-white text-2xl text-center my-2 font-bold">
                One to One
            </h2>
            {inddata.map((data) => {
                res += 5;
                let img = `https://picsum.photos/${res + 5}`;
                return (
                    <IndiChatPreview
                        id={data.id}
                        user_id={user_id}
                        name={data.firstname}
                        last_msg={data.msg_text}
                        url2={img}
                    />
                );
            })}
            <h2 className="text-white text-2xl text-center my-2 font-bold">
                Group
            </h2>
            {grpdata.map((data) => {
                res += 5;
                let img = `https://picsum.photos/${res + 5}`;
                return (
                    <IndiChatPreview
                        id={data.id}
                        user_id={user_id}
                        name={data.name}
                        last_msg={data.msg_text}
                        url2={img}
                    />
                );
            })}
        </div>
    );
}

export default Chatbox;
