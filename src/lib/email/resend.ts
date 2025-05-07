import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  html,
  to,
  subject,
}: {
  html: string;
  to: string;
  subject: string;
}) {
  await resend.emails.send({
    from: "no-reply@ghnotify.com",
    to,
    subject,
    html,
  });
}
