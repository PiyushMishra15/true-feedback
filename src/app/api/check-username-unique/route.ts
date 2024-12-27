import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import {z}  from "zod"
import { usernameValidation } from "@/app/schemas/signUpSchema";



export async function GET(request:Request){
    
   
    const UsernameQuerySchema=z.object({
        username:usernameValidation
    })
    await dbConnect()
    try{
//localhost:300/api/cuu?username=hitesh?phone=android
  const {searchParams}=new URL(request.url)
  const  queryParam={
    username:searchParams.get('username'),
  }

  ///validate with zod
  const result=UsernameQuerySchema.safeParse(queryParam)
  console.log(result)
  if(!result.success){
    const usernameErrors=result.error.format().
    username?._errors  || []

    return Response.json({
        success:false,
        message:usernameErrors?.length>0 ? usernameErrors.join(','):'Invalid query paramenters'
    },{status:400})

  }

  const {username}=result.data
  const existingVerificationUser=await UserModel.findOne({username,isVerified:true})

       if(existingVerificationUser){
        return Response.json({
            success:false,
            message:'Username is already taken',},{status:400})
        
       }

       return Response.json({
        success:true,
        message:"username is unique"
       },{status:500})


    }catch(error){
        console.error("Error checking username",error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },{status:500}
        )
    }


}