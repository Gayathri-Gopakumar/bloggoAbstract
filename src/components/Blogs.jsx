// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Blog from './Blog';

// const Blogs = () => {
//   const [blogs, setBlogs] = useState();
//   const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
//   console.log(userId);
  

//   const sendRequest = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/blogs");
//       const data = res.data;
//       console.log("Blogs data:", data); // Check structure of the received data
//       return data;
//     } catch (err) {
//       console.log("Error fetching blogs:", err);
//     }
//   };

//   useEffect(() => {
//     sendRequest().then((data) => setBlogs(data.blogs));
//   }, []);

//   return (
//     <div>
//       {blogs &&
//         blogs.map((blog, index) => {
//           console.log("Blog data:", blog); // Log each blog item
//           console.log("Comparing userId:", String(userId), "with blog.user._id:", String(blog.user?._id));
//           console.log(blogs._id);
          
//           return (
//             <Blog
//               key={index}
//               id={blog._id}
//               isUser={String(userId) === String(blog.user?._id)} // Handle possible undefined
//               title={blog.title}
//               description={blog.description}
//               imageURL={blog.image}
//               userName={blog.user?.name} // Handle possible undefined
//             />
//           );
//         })}
//     </div>
//   );
// };

// export default Blogs;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  console.log("User ID:", userId);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blogs");
      const data = res.data;
      console.log("Fetched blogs:", data); // Check structure of the received data
      return data.blogs; // Return the array directly
    } catch (err) {
      console.log("Error fetching blogs:", err);
      return []; // Return an empty array on error
    }
  };

  useEffect(() => {
    sendRequest().then(setBlogs); // Set blogs directly
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog._id} // Use _id as the key
          id={blog._id} // Ensure you are passing the correct id
          isUser={String(userId) === String(blog.user?._id)} // Handle possible undefined
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user?.name} // Handle possible undefined
        />
      ))}
    </div>
  );
};

export default Blogs;