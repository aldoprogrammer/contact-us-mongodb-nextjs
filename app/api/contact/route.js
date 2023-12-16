import Contact from "@/app/models/contact";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { fullname, email, message} = await req.json();

    console.log("fullname", fullname)
    console.log("email", email)
    console.log("msg", message)

    try {
        await connectDB();
        await Contact.create({ fullname, email, message});
        
        return NextResponse.json({
            msg: ['Message sent succesfully'],
            success: true,
        });
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(e.message)
            }

            return NextResponse.json({msg: errorList})
        }
        else {
            return NextResponse.json({msg: "Unable to send msg"})
        }
    }

    return NextResponse.json({msg: ['hi from route.ts']})
}