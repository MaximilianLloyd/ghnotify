import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  html,
  to,
  subject,
  react,
}: {
  html?: string;
  to: string;
  subject: string;
  react?: React.ReactNode;
}) {
  await resend.emails.send({
    from: "GH notify <no-reply@ghnotify.com>",
    to,
    subject,
    html,
    react,
  });
}
