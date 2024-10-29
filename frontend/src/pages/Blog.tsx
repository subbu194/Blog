import { Appbar } from "../components/AppBAr";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";
import { Mainblog } from "../components/Mainblog";
import { Skeliton } from "../components/Skeliton"


export const Blog = () => {
   const { id } = useParams();
   const { loading, blog } = useBlog({
      id:id || ""
  });
  if (loading || blog) {
    return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <Skeliton />
                <Skeliton />

            </div>
        </div>
    </div>
}

   return <div>
    
     <Mainblog
    //@ts-ignore
     blog={blog}
     />
   </div>

}