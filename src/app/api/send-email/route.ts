import { NextRequest,NextResponse } from "next/server";
import { Resend } from "resend";

const resend =new Resend('re_Xh5SJw28_KxdMzd7mWaS7oFrK8E7pdDsL');

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const{name,email,phone,sunday,team,position,field,opinion} = reqBody;
        console.log(reqBody);
        await resend.emails.send({
            to: 'varangantipr123@gmail.com',
            from: 'onboarding@resend.dev',
            subject:"Interest in joining the Season ",
            html:`
            <h1>Interest in joining the Season </h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Sunday: ${sunday}</p>
            <p>Team: ${team}</p>
            <p>Position: ${position}</p>
            <p>Field: ${field}</p>
            <p>Opinion: ${
                opinion
                    ? opinion
                    : "No opinion"
            }</p>
            `
        })
        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
        })

    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}