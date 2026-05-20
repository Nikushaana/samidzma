import {
  getServerSideBlogCategories,
  getServerSideBlogs,
} from "../../../dataFetchs/getServerSide/getData";
import BlogClient from "./blogClient";

export default async function Page() {
  const blogData = await getServerSideBlogs();
  const blogCategories = await getServerSideBlogCategories();


  return <BlogClient blogData={blogData} blogCategories={blogCategories} />;
}
