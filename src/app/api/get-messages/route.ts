import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options"
import mongoose from "mongoose";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";

import { User } from "next-auth";




export async function GET(req:Request){
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

    const userId=new mongoose.Types.ObjectId(user._id);
    console.log(userId)
    try{
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },  
            { $unwind: "$messages" },     
            { $sort: { 'messages.createdAt': -1 } }, 
            { $group: { 
                _id: '$_id',             
                messages: { $push: '$messages' } 
              }
            }
          ]);
          console.log("nnnnnnnnnnnnnnn",user)
       
    if(!user || user.length===0){
        return Response.json({
            success:true,
                message:"No messages yet !",
            
            },{status:200})
    }

    return Response.json({
        success:true,
            messages:user[0].messages,
        
        },{status:200})


    }catch(error){
        return Response.json({
            success:false,
            message:"error in getting messages ",
            },{
                status:500 })


    }


}