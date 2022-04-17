import e, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.PASSWORD || "test";

export const somethingWentWrong = (req: Request, res: Response) => {
	res.status(500).json({ message: "something went Wrong." });
	return;
};

export const sendMail = async (inputObj: any) => {
	console.info({ inputObj });
	const { email, text } = inputObj;

	let testaccount = await nodemailer.createTestAccount();

	let mailTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "taseer.baig@gmail.com",
			pass: password,
		},
	});

	// Setting credentials
	let mailDetails = {
		from: "taseer.baig@gmail.com",
		to: email,
		subject: "Here is a link to verify your account!",
		text,
		html: ``,
		// html,
		// 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n',
	};

	// Sending Email
	console.info("--- sending email ---");
	return mailTransporter.sendMail(mailDetails);
	// console.info({ "--- email sent ----": test });
	// , (err, data) => {
	// if (err) {
	// console.log("Error Occurs", err);
	// } else {
	// console.log("Email sent successfully");
	// }
	// });

	return true;
};
