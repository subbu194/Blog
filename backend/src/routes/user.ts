import { Hono } from "hono";
import {signupinput,signinInput} from "@subbu194/medium-common"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    Jwt_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signupinput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: 'Invalid inputs'
      });
    }
    try {
      const user = await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:body.password
        }
      });
      const token = await sign({id: user.id,},c.env.Jwt_SECRET)
     
      return c.json({token})
  
    }catch(e){
      c.status(403);
      return c.json({Error:"error while signing up !!!!"});
    }
  })
  
userRouter.post('/signin', async (c) => {
      const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
      const body = await c.req.json();
      const { success } = signinInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message: 'Invalid inputs are not allowed'
        });
      }
      try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password
        }
      });
      if (!user) {
        c.status(403);
        return c.json({error: "invalid credentials !!!"});
      }
      const jwt = await sign({ id: user.id },c.env.Jwt_SECRET);
      return c.json({ jwt });
    }catch(e){
      console.log(e);
      c.status(411);
      return c.text("invalid !!");
    }
  })
  