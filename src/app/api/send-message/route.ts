import dbConnect from "@/app/lib/dbConnect";

import UserModel from "@/app/model/user";
import { Message } from "@/app/model/user";
import { messageSchema } from "@/app/schemas/messageSchema";


export async function POST(request:Request){
    await dbConnect()

    const {username,content}=await request.json()

    const validation = messageSchema.safeParse({content:content});

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: validation.error.errors.map((err) => err.message).join(", "),
        }),
        { status: 400 } );}


    try{
        const user=await UserModel.findOne({username})
        if(!user){
            return Response.json(
               {
                success:false,
                message:'user not found '
               },{ status:401  })
        }
          if(!user.isAcceptingMessages){
            return Response.json(
                {
                    success:false,
                    message:"user is not accepting message"
                },{status:403})
          }

       const newMessage= {content,createdAt:new Date()}

       user.messages.push(newMessage as Message)

       await user.save()

       return Response.json(
        {
            success:true,
            message:"message sent successfully"
        },{status:201})


    }

   catch(error){
    console.log(error)
    return Response.json({
        success:false,
        message:"error in sending  messages ",
        },{
            status:500 })

   }


}