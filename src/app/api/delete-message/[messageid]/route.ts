import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ObjectId } from "mongodb";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import { NextResponse } from "next/server";
import { User } from "next-auth";

// Corrected DELETE method
export async function DELETE(
  req: Request,
  { params }: { params: { messageid: string } } // ✅ Correct type
) {
  // Connect to the database
  await dbConnect();

  // Get the session from NextAuth
  const session = await getServerSession(authOptions);
  const user: User | undefined = session?.user;

  // Check if the user is authenticated
  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {
    // Convert messageid to ObjectId
    const messageId = new ObjectId(params.messageid); // ✅ Correct conversion

    // Find and update user by pulling the message from the messages array
    const response = await UserModel.updateOne(
      { _id: new ObjectId(user._id) }, // Make sure user._id is properly converted
      { $pull: { messages: { _id: messageId } } }
    );

    // If no message was modified, return an error
    if (response.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting message",
      },
      { status: 500 }
    );
  }
}
