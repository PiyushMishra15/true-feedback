import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import  { ObjectId } from "mongodb";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import { User } from "next-auth";




export async function DELETE(req:Request,{params}:{params:{messageid:ObjectId}}){
   
   const messageId=params.messageid
    await dbConnect()
  
    const session=await getServerSession(authOptions)
    const user:User= session?.user  

    if(!session || !session.user){
        return  Response.json({
            success:false,
            message:"Not Authenticated"
        },{
            status:401 })
    }

    
    try{
        const response = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
          );
    
          if(response.modifiedCount==0){
            return Response.json(
                {
                    success:false,
                    message:"Message not found or already deleted"
                },{status:401}
            )
          }

          return Response.json(
            {   
                success:true,
                message:"Message deleted"
            },{status:200}
        )
   

    }catch(error){
        console.log(error)
        return Response.json({
            success:false,
            message:"error in deleting messages ",
            },{ status:500 })


    }

  }