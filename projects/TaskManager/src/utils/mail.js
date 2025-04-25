import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        }
    });

    // Generate an HTML email with the provided contents
    const emailHTML = mailGenerator.generate(options.mailGenContent);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });

    const mail = {
        from: 'mail.taskmanager@example.com', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: emailText, // plain text body
        html: emailHTML, // html body
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Email failed", error);
    }
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with our App, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'We got a request to reset your password.',
            action: {
                instructions: 'To change your password, click the button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                    link: passwordResetUrl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
};

// sendMail({
//     email: user.email,
//     subject: "aaa",
//     mailGenContent: emailVerificationMailGenContent(
//         username,
//         ``
//     )
// });
