import { Resend } from "resend";
import VerificationEmail from "../../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";





export async function sendVerificationEmail(
    email:string,username:string,verifyCode:string):Promise<ApiResponse>{


        try {

            const resend = new Resend("re_bx1uZiEn_JrHoiLztAVDHwyvn6Lwgz8i2");  
       

            const { data} = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: email,
                subject: 'Mystery message | Verification code',
                react:VerificationEmail({username,otp:verifyCode}),
              });




            console.log(data)
            return {success:true,message:'Verification email send successfully '}    
        }
        catch(emailError){
            console.log(emailError);
            return {success:false,message:'failed to send email'}
        }

    }
