'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Para desarrollo
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

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/es/verify-account?token=${token}`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Confirma tu cuenta</h2>
      <p style="color: #666; line-height: 1.6;">
        Gracias por registrarte en The Side News. Haz clic en el siguiente enlace para verificar tu cuenta:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verificar cuenta
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        O copia y pega este enlace en tu navegador:<br>
        <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        Este enlace expira en 24 horas.
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Confirma tu cuenta - The Side News',
    html,
  });
}