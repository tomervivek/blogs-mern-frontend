import { useNavigate } from "react-router-dom";
import { useSavedBlogContext } from "../SavedBlogContext";
import { useEffect, useState } from "react";

const BlogCard = ({ data }) => {
  const [user, setUser] = useState(null);
  const { checked, onChangeFun } = useSavedBlogContext();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const dateHandler = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthNameLong = dateObj.toLocaleString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    return (day <= 9 ? "0" : "") + day + "-" + monthNameLong + "-" + year;
  };

  return (
    <div className="group rounded-md relative block bg-black">
      <div
        onClick={() => {
          if (user) {
            onChangeFun(data._id);
          }
          else {
            navigate("/login");
          }
        }}
        className="absolute top-2 z-50 right-2 text-red-500 cursor-pointer"
      >
        {checked.includes(data._id) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}
      </div>
      <a href={"/blog/" + data._id}>
        <img
          alt="Developer"
          src={data.selectedImage}
          className="absolute inset-0 h-[400px] rounded-md w-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
        />

        <div className="relative p-4 sm:p-6 flex flex-col justify-end h-[400px]">
          <p className="text-sm font-medium uppercase tracking-widest text-[#34BE82]">
            {dateHandler(data.createdDate)}
          </p>

          <p className="text-base font-semibold text-white line-clamp-3">
            {data.title}
          </p>
          <div className="text-sm text-white ">{data.author}</div>
          <p className="text-sm mt-2 text-white line-clamp-2">{data.content}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogCard;
