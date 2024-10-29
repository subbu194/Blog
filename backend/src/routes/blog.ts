import { Variables } from 'hono/types';
import { Hono } from "hono";
import {createBloginput,updateBloginput} from "@subbu194/medium-common"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    Jwt_SECRET: string
	},
    Variables:{
     userId:string;
    }
}>();

blogRouter.use('/*',async (c , next)=> {
    const authheader = c.req.header("authorization") || "";
    const user = await verify(authheader, c.env.Jwt_SECRET);
  try{
    if(user){
      //@ts-ignore
        c.set("userId", user.id);
       await next()
    } else {
      c.status(403);
      return c.json({message:"unauthorized"})
    }} catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged in"
      })
  }
})



blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBloginput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: 'Invalid inputs are not valid'
      });
    }

    let userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorid:parseInt(userId)
            }
      })

      return c.json({
        id:blog.id,
      })
      
  })
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBloginput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: 'Invalid inputs are not valid here'
      });
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const blog = await prisma.blog.update({
           where:{
            id:body.id
           },
        data:{
                title:body.title,
                content:body.content,
                
            }
      })

      return c.json({
        id:blog.id,
      })
      
  })
  

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const blogs = await prisma.blog.findMany({
      select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    }); 
    return c.json({
      blogs
      })
  })
  


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      try {
        const blog = await prisma.blog.findFirst({
            where:{
             id:parseInt(id)
            },
            select:{
              id: true,
              title: true,
              content: true,
              author: {
                select: {
                  name: true
              }
              }
            }
       })
 
       return c.json({
         blog
       })
      }catch(e){
        c.status(411);
        return c.json({
            message:"error while fetching blog !!!"
          })
      }
  })
  
