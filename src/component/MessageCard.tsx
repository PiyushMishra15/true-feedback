"use client"
import React from 'react'
import {  Card,  CardDescription, CardHeader,} from "@/components/ui/card"
import {AlertDialog, AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Message } from '@/app/model/user'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
import { ObjectId } from "mongodb";
import { Trash } from "lucide-react";
type MessageCardProps={
 
    message:Message;
    onMessageDelete:(messageId:ObjectId)=>void
}

 export const MessageCard=({message,onMessageDelete}:MessageCardProps)=>{
    const {toast}=useToast()
  
    const handleDeleteConfirm=async()=>{
      console.log("ffffffffffffffffff",message._id)
     const response=await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      
     toast({
      title:response.data.message,
      variant:'default'
    })
     onMessageDelete(message._id);

    
    }

    return (
      
      <Card className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="p-4 border-b">
        <CardDescription className="text-black text-xl font-bold mt-4">{message.content}</CardDescription>
        </CardHeader>
      
          <AlertDialog>
            <AlertDialogTrigger asChild>
             <Button variant="outline" className='w-2 h-2'   >
                <Trash className="w-2 h-2 " /> </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription >
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter >
                <AlertDialogCancel >Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </Card>
    );
    }