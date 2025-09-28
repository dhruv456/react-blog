import { useForm, Controller, useWatch } from "react-hook-form";
import RTE from "../RTE";
import Input from "../Input";
import { useEffect } from "react";
import dataService from "../../service/data";
import { useNavigate } from "react-router-dom";
const PostForm = () => {
  console.log("Rendered form");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "<h1>Hello, world!!</h1>",
      status: "active",
    },
  });

  const watchTitle = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    const slug = generateSlug(watchTitle || "");
    setValue("slug", slug);
  }, [watchTitle]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^\w-]/g, "") // Remove special characters except dashes
      .replace(/-+/g, "-") // Replace multiple dashes with single dash
      .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
  };
  const onsubmit = async (data) => {
    try {
      const res = await dataService.createPost(data);
      if (!res) {
        console.error("config related error while submitting form");
        return;
      }
      navigate("/post/" + res.$id);
    } catch (error) {
      setError("title", {
        type: "manual",
        message: "Slug already exists. Please choose a different title.",
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <div className="flex flex-col gap-4">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Pls fill the title",
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input label={"Title:"} {...field} />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => {
                return <Input label={"Slug:"} {...field} disabled />;
              }}
            />
          </div>
          <div>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RTE onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 cursor-pointer float-right disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
