import React from "react";
import RTE from "../components/RTE";
import PostForm from "../components/PostForm/PostForm";

const AddPost = () => {
  // throw new Error("Simulated error for testing ErrorBoundary");
  return (
    <div>
      <h1>Add Post</h1>
      <PostForm />
    </div>
  );
};

export default AddPost;
