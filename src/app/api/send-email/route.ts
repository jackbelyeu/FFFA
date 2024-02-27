import { NextRequest,NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

const resend =new Resend("Resend Key"); // Replace with your Resend Key(https://resend.dev/)

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const{name,email,phone,sunday,team,position,field,opinion} = reqBody;
        console.log(reqBody);
        await resend.emails.send({
            to: 'your_email', // Replace with the email or domain name registered with Resend(https://resend.dev/)
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
                <p>Opinion: ${opinion ? opinion : "No opinion"}</p>
            `,
        });
        const result=await sql`INSERT INTO expressed_interest (name, email, phone, sunday, team, position, field, opinion) VALUES (${name}, ${email}, ${phone}, ${sunday}, ${team}, ${position}, ${field}, ${opinion});`;
        console.log(result);
        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
            result
        });


    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        );
    }
}
