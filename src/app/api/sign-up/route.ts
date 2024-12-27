import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";

export async function POST(request: Request) {
await dbConnect();



  try {
    const { username, email, password } = await request.json();

    console.log('Request data:', { username, email, password });


    // Check if the username is already taken and verified
    const existingUserVerificationByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerificationByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); 
        await existingUserByEmail.save();

        // Send verification email (optional return here based on your app logic)
        const emailResponse = await sendVerificationEmail(
          email,
          username,
          verifyCode
        );

        if (!emailResponse.success) {
          return Response.json(
            {
              success: false,
              message: emailResponse.message,
            },
            { status: 500 }
          );
        }

        return Response.json(
          {
            success: true,
            message: emailResponse.message,
          },
          { status: 200 }
        );
      }
    } else {
      // If no existing user, create a new user
      const hashedPassword = bcrypt.hashSync(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();

      // Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: emailResponse.message,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
