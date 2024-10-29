import { BlogCrad } from "../components/BlogCrad"
import { Appbar } from "../components/AppBAr"
import { useBlogs } from "../hooks"
import { Skeliton } from "../components/Skeliton"

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
      return <div>
          <Appbar /> 
          <div  className="flex justify-center">
              <div>
                  <Skeliton />
                  <Skeliton />
                  <Skeliton />
                  <Skeliton />
                  <Skeliton />
              </div>
          </div>
      </div>
  }
  
    return <div>
    <Appbar />
    <div  className="flex justify-center">
        <div>
        {blogs.map(blog => <BlogCrad
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    authorname={blog.author.name || "Anonymous"} 
                    publishedDate={"2nd Feb 2024"}
                />)}
        </div>
    </div>
</div>
}