import { collection } from "@/Database/Model/UsersSchema/UsersSchema";
import { NextResponse } from "next/server"

export const GET = async ()=>{
    const result = await collection.find({});
    console.log(result[0])
    return NextResponse.json(result);
}

export const POST = async () =>{
    const data = new collection({
        title:"hello",
        desc:"there"
    })
    const result = await data.save();
    console.log(result);
    return NextResponse.json({status:"ok"});
}