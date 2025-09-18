import { Resend } from "resend";
import { email } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your Email - Habit Tracker",
        html: `
            <p>
            Click <a href=${confirmLink}>here</a> to confirm your email.
            </p>
        `,
    });
};

export const sendPassResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your Password - Habit Tracker",
        html: `
            <p>
            Click <a href=${confirmLink}>here</a> to reset your password.
            </p>
        `,
    })
}
