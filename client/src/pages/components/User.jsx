import threeDots from "../../assets/three-dots.svg";

function User({ id }) {
    const pic = "https://picsum.photos/50";
    return (
        <div className="sticky top-0 flex justify-between p-3 px-4 items-center bg-[#FFB923] border-[1px] border-gray-200">
            <img src={pic} alt="profile" className="rounded-full" />
            <img src={threeDots} alt="three dots" className="h-5 px-4" />
        </div>
    );
}

export default User;
