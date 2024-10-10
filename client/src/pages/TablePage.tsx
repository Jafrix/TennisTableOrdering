import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import ChangePost from "../components/Posts/ChangePost";
import CreateFormPost from "../components/Posts/CreateFormPost";
import { useNavigate } from "react-router-dom";

function TablePage({ user }) {

  const [posts, setPosts] = useState([]);
  // const nav = useNavigate();

  const loadPosts = async () => {
    try {
      const response = await axiosInstance.get("/post");
      if (response.status === 200) {
        
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // nav("/");

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="add-form">
      <>
      {user && <CreateFormPost setPosts={setPosts} user={user}/>}
      </>
      <div id="item-wrapper">
        <>
        {posts.map((post) => (
          <ChangePost  key={post.id} post={post} setPosts={setPosts} user={user} />
        ))}
        </>
      </div>
    </div>
  );
}

export default TablePage;
