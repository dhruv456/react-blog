import { data, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import dataService from "../service/data";
import ShadowRootContainer from "../components/Container/ShadowRootContainer";

const Post = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function fetchAllData() {
      const post = await dataService.getPostById(id);
      setLoading(false);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setImageSrc(
          post.featuredImage ? dataService.getFileUrl(post.featuredImage) : ""
        );
      } else {
        setNotFound(true);
      }
    }

    fetchAllData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (notFound) return <div>Post not found</div>;
  return (
    <div>
      {imageSrc && <img src={imageSrc} />}
      <ShadowRootContainer>
        <div>
          <h2>{title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      </ShadowRootContainer>
    </div>
  );
};

export default Post;
