import { Appbar } from "./AppBAr"
import { blog } from "../hooks"
import { Avatar } from "./BlogCrad"
export const Mainblog = ({blog}:{blog:blog}) => {
return <div>
        <Appbar />
    <div className="flex justify-center">
       <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
            <div className="col-span-8 ">
                <div className="text-5xl font-extrabold">
                {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    post on 1st september 2024
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>   
            </div>
            <div className="col-span-4 ">
                <div className="text-slate-500">
                Author
                </div>
                <div className="flex">
                    <div className="pr-3 pt-4">
                    <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                    </div>
                <div>
                    <div className="text-xl font-extrabold">
                      {blog.author.name || "Anonymous"}
                    </div>
                   <div>
                      Random catch phrase about the author's ability to grab the user's attenction
                  </div>
                </div>
                </div>

            </div>
            
       </div>
    </div>
</div>
}