import z from 'zod';
export const signupinput =  z.object({
    email :z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  })

 export const signinInput =  z.object({
    email :z.string().email(),
    password:z.string().min(6)
  })


 export const createBloginput = z.object({
    title :z.string(),
    content:z.string(),
    
 });


 export const updateBloginput = z.object({
    title :z.string(),
    content:z.string(),
    id:z.number()
 });
 export type Signupinput = z.infer<typeof signupinput>
 export type SigninInput = z.infer<typeof signinInput>
 export type CreateBloginput = z.infer<typeof createBloginput>
 export type UpdateBloginput = z.infer<typeof updateBloginput>