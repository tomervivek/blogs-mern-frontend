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
    console.log(process.env.REACT_APP_BASE_URL);
    
  }, []);

    useEffect(() => {
    getBlogs();
  }, [user]);
const getBlogs=()=>{
     var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
var requestOptions = {
  method: 'Get',
    headers: myHeaders,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}blogs/fav-blogs?email=${user?.email}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
      const savedBlogs = result.map(blog => blog.BlogId);
setChecked(savedBlogs)
    
  })
  .catch(error => console.log('error', error))
}

  const onChangeFun = (value) => {
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
var requestOptions = {
  method: 'Get',
    headers: myHeaders,
  redirect: 'follow'
};
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

    fetch(process.env.REACT_APP_BASE_URL +  "blogs/add-fav", requestOptions)
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
