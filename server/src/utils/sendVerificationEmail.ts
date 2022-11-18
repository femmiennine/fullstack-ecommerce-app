import nodemailer from 'nodemailer';
import dev from '../config/secrets';

export const sendVerificationEmail = async (
  email: string,
  firstname: string,
  lastname: string,
  _id: any,
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
      subject: 'Verification Email',
      html: `<p> Welcome ${firstname} ${lastname}! <a href="http://localhost:3000/verify-user/${_id}"> Click for email verification </a> </p>`,
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
