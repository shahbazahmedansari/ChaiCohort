import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
    // get data

    const { name, email, password } = req.body;

    // validate user

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    console.log(email);


    try {
        // check if user already exists

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // create a user in database

        const user = await User.create({
            name,
            email,
            password,
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "User not registered",
            });
        }

        // create a verification token

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);

        // save token in database
        user.verificationToken = token;
        await user.save();

        // send token as email to user
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}
            `, // plain text body
        };

        await transporter.sendMail(mailOptions);

        // send success status to user

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            success: false,
            error,
        });
    }
    // console.log(req);
    // console.log(res);
};

