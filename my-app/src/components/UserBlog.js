import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const UserBlog = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blog-app-7ygu.onrender.com/api/blog/user/${id}`)
      .catch((err) => console.log(err))
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  })
  console.log(user);
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index) => (
        <Blog
          id={blog._id}
          key={index}
          isUser={true}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={user.name} />
      ))}
    </div>
  )
}

export default UserBlog
