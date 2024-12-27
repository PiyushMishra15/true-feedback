"use client"
import React, {useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { messageSchema } from "@/app/schemas/messageSchema"
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter,useParams } from 'next/navigation';
import { ApiResponse } from "@/types/ApiResponse"
import axios, { AxiosError } from "axios"
import { Loader2 } from 'lucide-react'



export default function Page() {
  const [message, setMessage] = useState<string[]>([
    "Great job on the code! Your logic is spot on. Keep it up!",
    "Your approach is solid! Maybe consider optimizing this section for performance.",
    "Nice work! A little more attention to edge cases would make it even better.",
    "Well done! You’ve demonstrated excellent problem-solving skills, just keep refining the code!",
    "Awesome! Your code is clean and efficient. Keep pushing those boundaries!"
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAi, setIsLoadingAi] = useState(false)
  const [copyVal,setCopyVal]=useState('')

  
const router = useRouter();
  const { toast } = useToast();
  const param=useParams()
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content:"",
    },
  })


  async function copy(msg:string){
    navigator.clipboard.writeText(msg)
     setCopyVal(msg)
    
    toast({
        title: 'Copied to clipboard',
        description:'Message has been copied'
      })
  }

   const onSubmit = async () => {  
    setIsLoading(true)               
    
    try {
      const d = {username:param.username,content:copyVal}
      const response = await axios.post<ApiResponse>('/api/send-message',d)
      if (response.data.success) {
        toast({
          title: "Your message has been sent :",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(copyVal, null, 2)}</code>
            </pre>
          ),
        })}
    } catch (error) {
      setIsLoading(false)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error in sending message",
        description: axiosError.response?.data.message || "Failed to send message ",
        variant: "destructive"
      })
    } finally {
      setCopyVal('')
      setIsLoading(false)} }

   const [count,setCount]=useState(0);
    
  const messages= [
    "What’s a hobby you’ve recently started?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a simple thing that makes you happy?",
    "What’s a place you’ve always wanted to visit?",
    "What’s the best piece of advice you’ve ever received?",
    "What’s a food you could eat every day?",
    "What’s a skill you wish you could master instantly?",
    "If you could relive one day, what would it be?",
    "What’s a song that always lifts your mood?",
    "If you could learn any language, what would it be?",
    "What’s your favorite way to spend a lazy day?",
    "What’s a movie or book that made a big impact on you?",
    "If you could live in any fictional world, where would it be?",
    "What’s your favorite childhood memory?",
    "What’s something new you tried recently?",
    "If you could invent one thing, what would it be?",
    "What’s a quote or saying that inspires you?",
    "What’s the most interesting thing you’ve learned this week?",
    "What’s a dream you had as a child that still inspires you?",
    "If you could be an expert in any field, what would it be?",
    "What’s the best compliment you’ve ever received?",
    "What’s something you’re really proud of?",
    "If you could time travel, would you go to the past or the future?",
    "What’s your favorite way to unwind after a long day?",
    "What’s a talent or skill you admire in others?",
    "If you could only eat one cuisine for the rest of your life, what would it be?",
    "What’s a small act of kindness you experienced recently?",
    "What’s a story from your life that always makes you smile?",
    "If you could have any superpower, what would it be?",
    "What’s your favorite season, and why?"
  ]
  
  

  async function aiMessageGet() {
    try {
      setIsLoadingAi(true);

      setMessage(messages.slice(count,count+5))
      setCount(count+5);
      
      toast({
        title: "success",
        description: "Messages Regenerated.",
        variant: "default",
      })


    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Something went wrong while fetching messages.",
        variant: "destructive",
      })
      setMessage([])
    } finally {
      setIsLoadingAi(false)
    }
  }

  return (
    <>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-4xl ml-8 font-bold mb-4 ">PUBLIC PROFILE LINK</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6 ml-60">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input placeholder="Write your Anonymous Message." value={copyVal}
                   onChange={(e) => {
                    setCopyVal(e.target.value); // Update external state
                    field.onChange(e); // Update react-hook-form state
                  }} 
             />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button"  onClick={onSubmit}  className="w-full md:w-auto">
            SEND 
          </Button>   { (isLoading)?<span><Loader2 className="h-4 w-4 animate-spin ml-2" /></span>:''}
          
        </form>
      </Form>
      

      <Button onClick={aiMessageGet} className="ml-24 bg-zinc-950 mt-8">Suggest Messages</Button>
      <h1 className="mt-4 ml-24">Click on any message to copy it..</h1>

      <div className=" ml-4 my-8 mx-4 md:mx-4 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">Message Suggestion</h1>

        {isLoadingAi ? (
          <Loader2 className="h-8 w-8 animate-spin" />

        ) : (
          <div className="mt-4 grid  gap-6">
            {message.length > 0 ? (
              message.map((msg, index) => (
                <div key={index} onClick={()=>{copy(msg)}} >
                <h1   className="text-lg font-bold mb-4">{msg}</h1></div>
              ))
            ) : (
              <p>No messages to display.</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
  <button
    onClick={() => router.push('/dashboard')}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300"> Get Your Message Board</button>
</div>
    </>
  )
}
