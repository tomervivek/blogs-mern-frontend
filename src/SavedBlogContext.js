import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedBlogContext = createContext();

export const SavedBlogProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(
     []
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
  }, []);

    useEffect(() => {
    getBlogs();
  }, [user]);
const getBlogs=()=>{
var requestOptions = {
  method: 'Get',
  redirect: 'follow'
};

fetch(`https://blog-mern-jzhb.onrender.com/blogs/fav-blogs?email=${user?.email}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
      const savedBlogs = result.map(blog => blog.BlogId);
setChecked(savedBlogs)
    
  })
  .catch(error => console.log('error', error))
}

  const onChangeFun = (value) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");
    const data = {
      BlogId: value,
      UserId: user.UserId,
      email: user.email,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("https://blog-mern-jzhb.onrender.com/blogs/add-fav", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (
          result.message === "Added to favorites" ||
          result.message === "Removed from favorites"
        ) {
          if (checked.includes(value)) {
            setChecked(checked.filter((item) => item !== value));
          } else {
            setChecked([...checked, value]);
          }
        } else {
          toast.error("Something went wrong!!");
        }
      })
      .catch((error) => toast.error("Something went wrong!!"));
  };
  return (
    <SavedBlogContext.Provider value={{ checked, onChangeFun }}>
      {children}
    </SavedBlogContext.Provider>
  );
};

export const useSavedBlogContext = () => {
  return useContext(SavedBlogContext);
};
