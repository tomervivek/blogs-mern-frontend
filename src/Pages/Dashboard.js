import { useEffect, useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import BreadCrumb from '../Components/BreadCrumb';
import BlogCard from '../Components/BlogCard';
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(false);
 const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  useEffect(() => {
      getBlogs();
    if (user) {
      getFavBlogs();
    }
  }, [user]);

  const getBlogs = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_BASE_URL +  "blogs/all-blogs")
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  };

  const getFavBlogs = () => {
       var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
var requestOptions = {
  method: 'Get',
    headers: myHeaders,
  redirect: 'follow'
};
    fetch(`${process.env.REACT_APP_BASE_URL}blogs/fav-blogs?email=${user?.email}`,requestOptions)
      .then(response => response.json())
      .then(result => setFavData(result))
      .catch(error => console.log('error', error));
  };

  const favoriteBlogIds = favData.map(fav => fav.BlogId);
  const filteredData = data.filter(blog => favoriteBlogIds.includes(blog._id));

  return (
    <div>
     <Helmet>
      <title>Dashboard - MindSpring</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>
      <HeaderSection>
        <div className="max-w-screen-xl mx-auto p-5">
          <BreadCrumb pageUrl={"fav-blogs"} Page={"Fav Blogs"} />
        </div>

        {!user ? (
          <div className="text-center py-20 text-lg text-red-600">
            Please <a href="/login" className="text-blue-600 underline">log in</a> to view your dashboard.
          </div>
        ) : (
          <div className="mx-auto max-w-screen-xl px-5 mb-10">
        
<div className="flex items-center space-x-6 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-md border-l-8 border-green-400 p-6 mb-8 w-full mx-auto sm:mx-0">
  <div className="flex-shrink-0">
    <div className="w-16 h-16 rounded-full bg-green-400 text-white flex items-center justify-center text-2xl font-bold uppercase shadow-md">
      {user.name ? user.name[0] : 'U'}
    </div>
  </div>

  <div>
    <h2 className="text-2xl font-semibold text-green-900">{user.name}</h2>
    <p className="text-green-700 mt-1">{user.email}</p>
    <p className="mt-2 text-green-600 italic text-sm">Welcome back to your dashboard!</p>
  </div>
</div>


            {loading ? (
              <div className="my-40 w-full text-center">
                <img src="/logo-1-tbg.png" alt="Loading..." className="animate-spin mx-auto" />
                <div>Loading...</div>
              </div>
            ) : (
              <div>
                <div className="text-center sm:max-w-3xl mx-auto mb-6">
                  <div className="text-2xl font-semibold">Your Favorite Blogs</div>
                  <div className="text-sm text-gray-700 mt-2">
                    A curated list of blogs you love most!
                  </div>
                </div>

                {filteredData.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredData.map((item) => (
                      <BlogCard key={item._id} data={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">You haven’t favorited any blogs yet!</div>
                )}
              </div>
            )}
          </div>
        )}
      </HeaderSection>
    </div>
  );
};
export default Dashboard;
