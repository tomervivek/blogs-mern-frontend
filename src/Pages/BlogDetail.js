import { useParams } from "react-router-dom";
import HeaderSection from "../Components/HeaderSection";
import { useEffect, useState } from "react";
import BlogDetailCard from "../Components/BlogDetailCard";
import BreadCrumb from "../Components/BreadCrumb";
import { Helmet } from "react-helmet";

function BlogDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    getBlogs()
  },[])
  const getBlogs = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Id", id);
    var requestOptions = {
      method: "Get",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_BASE_URL +  "blogs/"+id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
       setData(result);
       
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };
  return (
    <div>
     <Helmet>
      <title>{`${data?.title}- MindSpring`}</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>
      <HeaderSection>
     <div className="bg-gray-100"><div className="max-w-screen-xl bg-gray-100 mx-auto p-5">
     <BreadCrumb pageUrl={"/blogs"} Page={"Blogs"} PageTwo={data?.Title} /></div>
     </div>  {loading ? (
          <div className="py-40 bg-gray-100 w-full text-center">
            <img src="/logo-1-tbg.png" alt="" className="animate-spin mx-auto" />
            <div>Loading...</div>
          </div>
        ) : (
      <div className="sm:pb-10 bg-gray-100 pb-6">
      <BlogDetailCard data={data} /></div>
        )}
      </HeaderSection>
    </div>
  );
}
export default BlogDetail;
