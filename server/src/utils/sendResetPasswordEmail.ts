import nodemailer from 'nodemailer';
import dev from '../config/secrets';

export const sendResetPasswordEmail = async (
  firstname: string,
  lastname: string,
  email: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: dev.app.auth_email,
        pass: dev.app.auth_password,
      },
    });

    const mailOptions = {
      from: dev.app.auth_email,
      to: email,
      subject: 'Reset Account Password Link',
      html: `<p>Hi ${firstname} ${lastname}! Kindly click the link below to reset your password</p> <b/> 
            <a href="http://localhost:3000/reset-password"> Please reset your password </a>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
