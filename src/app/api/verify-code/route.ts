import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import { verifySchema } from "@/app/schemas/verifySchema";



export async function POST(request:Request){
    await dbConnect();

    try{
    

       const {username,code}=await request.json();



       const result=verifySchema.safeParse({username,code})
       console.log(result)
       if (!result.success) {
    
        const errors = result.error.errors.map(err => ({
          path: err.path.join("."),
          message: err.message,
        }));
  
        return new Response(JSON.stringify({
          success: false,
          errors,
        }), { status: 400 });
      }


       const decodedUsername=decodeURIComponent(username)
       const user=await UserModel.findOne({username:decodedUsername})
       if(!user){
        return Response.json(
            {
                success:false,
                message:"user not found"
            },{
                status:500
            }
        )
       }

       const isCodeValid=user.verifyCode===code

       const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date


       if(isCodeValid&&isCodeNotExpired){
          user.isVerified=true
          await user.save()
       }else if(!isCodeNotExpired){

        return Response.json({
            success:false,
            message:"Verification code has expired please sign in again "
           },{status:400})

       }else{
        Response.json({
            success:false,
            message:"Verification code is wrong....hacker "
           },{status:400})
       }


       return Response.json({
        success:true,
        message:"Verification successful"
       },{status:200})

        
    }catch(error){
        console.log(error);
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },{
                status:500
            }
        )
    }

}