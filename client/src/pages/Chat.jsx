import { Outlet, useParams } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import User from "./components/User";

function Chat() {
    const params = useParams();
    const user_id = params.user_id;
    return (
        <div className="flex bg-gray-700">
            <div className="w-[30%] overflow-y-auto h-screen">
                <User id={user_id} />
                <Chatbox user_id={user_id} />
            </div>
            <Outlet />
        </div>
    );
}

export default Chat;
