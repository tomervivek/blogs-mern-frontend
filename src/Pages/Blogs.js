import { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import HeaderSection from "../Components/HeaderSection";
import BreadCrumb from "../Components/BreadCrumb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";

function Blogs() {
const [data,setData]=useState([])
const [loading,setLoading]=useState(false)
const [searchQuery, setSearchQuery] = useState("");
useEffect(()=>{
  getBlogs()
},[])
const getBlogs=()=>{
  setLoading(true)
  var myHeaders = new Headers();
// myHeaders.append("Authorization", "Token 1435a113995b2c25c2376646e271312f1873a674");

var formdata = new FormData();

var requestOptions = {
  method: 'Get',
  // headers: myHeaders,
  // body: formdata,
  redirect: 'follow'
};

fetch("https://blog-mern-jzhb.onrender.com/blogs/all-blogs", requestOptions)
  .then(response => response.json())
  .then(result => {
    
      
      setData(result)
    
  })
  .catch(error => console.log('error', error)).finally(()=>setLoading(false))
}
const filteredData = data.filter((club) => {
  const searchableFields = [
    club["title"] || "",
    club["author"] || "",
  ];
  return searchableFields.some((field) =>
    field.toLowerCase().includes(searchQuery.toLowerCase())
  );
});

  return (
    <div>
    <Helmet>
      <title>Blogs - MindSpring</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>
      <HeaderSection>
    <div className="max-w-screen-xl mx-auto p-5"><BreadCrumb pageUrl={"blogs"} Page={"Blogs"} /></div>
    { loading?<div className="my-40 w-full text-center">
      <img src="logo-1-tbg.png" alt="img" className="animate-spin mx-auto" />
      <div>Loading...</div></div>: <div>
      <div className="sm:max-w-3xl text-center mx-auto mb-4  mx-auto max-w-screen-xl px-5">
        <div className="text-2xl font-semibold">From E-learning to EdTech: Trending Themes in Education</div>
        <div className="text-sm text-gray-700 mt-2">
        Discover a rich tapestry of educational insights in our blog, where we spotlight and dissect the trending topics that are redefining the realms of teaching, learning, and educational technology.
        </div>
        </div>
        <div className="mx-auto max-w-screen-xl px-5">
        
        <div className="relative">
        <MagnifyingGlassIcon className="absolute h-6 top-2 left-3 text-gray-500" />
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-xl outline-none p-2 pl-10 border-green-600"
        />
      </div>
      </div>
        {filteredData.length?<div className="grid grid-cols-1 sm:mb-10 mb-6 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-screen-xl p-5 ">
        
          {filteredData.map((item) => {
            return (
              <div key={item.id}>
                <BlogCard data={item} />
              </div>
            );
          })
        }
        </div> :<div className="text-center py-16">No data!!</div>}</div>}
      </HeaderSection>
    </div>
  );
}
export default Blogs;
