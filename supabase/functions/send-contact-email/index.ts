import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};


interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  purpose: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.local.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY env var");
      return new Response(JSON.stringify({ success: false, error: "Server email configuration is missing." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Resend key loaded:", {
      length: resendApiKey.length,
      prefix: resendApiKey.slice(0, 3),
    });

    const resend = new Resend(resendApiKey);

    const { firstName, lastName, email, phone, company, message, purpose }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { firstName, lastName, email, purpose });

    const purposeLabels: Record<string, string> = {
      work: "Work With Us",
      join: "Join Our Team",
      question: "General Question",
    };

    const emailResponse = await resend.emails.send({
      from: "Liftup Contact Form <onboarding@resend.dev>",
      to: "admin@liftupim.com",
      subject: `New Contact: ${purposeLabels[purpose] || purpose} - ${firstName} ${lastName}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Purpose:</strong> ${purposeLabels[purpose] || purpose}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (emailResponse?.error) {
      console.error("Resend returned an error:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: false, error: emailResponse.error.message }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse?.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
