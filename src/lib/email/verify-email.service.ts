import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
 to: string;
 subject: string;
 html: string;
}

export class EmailService {
 static async sendEmail({ to, subject, html }: EmailData) {
  try {
   const { data, error } = await resend.emails.send({
    from: 'noreply@tudominio.com', // Cambia por tu dominio
    to,
    subject,
    html,
   });

   if (error) {
    throw new Error(error.message);
   }

   return data;
  } catch (error) {
   console.error('Error enviando email:', error);
   throw error;
  }
 }

 static async sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/es/verify-account?token=${token}`;

  const html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2>Confirma tu cuenta</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verificar cuenta
        </a>
        <p>O copia y pega este enlace en tu navegador:</p>
        <p>${verificationUrl}</p>
        <p>Este enlace expira en 24 horas.</p>
      </div>
    `;

  return this.sendEmail({
   to: email,
   subject: 'Confirma tu cuenta',
   html,
  });
 }
}