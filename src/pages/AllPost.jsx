import React, { useEffect, useState } from "react";
import dataService from "../service/data";
import { useNavigate } from "react-router-dom";

const AllPost = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListOfPost() {
      const lst = await dataService.getListOfPosts();
      console.log(lst);
      setPostList(lst);
      setLoading(false);
    }
    fetchListOfPost();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <p>List of all posts will be displayed here.</p>
      {loading ? (
        <h3 className="text-3xl">Loading...</h3>
      ) : (
        <div>
          {postList.map((post) => (
            <div
              className="w-28 h-28 border-2 cursor-pointer mb-2"
              key={post.$id}
              onClick={() => {
                navigate(`/post/${post.$id}`);
              }}
            >
              {post.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
