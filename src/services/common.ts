import e, { Request, Response } from "express";
import nodemailer from "nodemailer";
const password = process.env.PASSWORD || "test";
console.info({ password });

export const somethingWentWrong = (req: Request, res: Response) => {
	res.status(500).json({ message: "something went Wrong." });
	return;
};

export const sendMail = (inputObj: any) => {
	const { email, text } = inputObj;
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
		// 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n',
	};

	// Sending Email
	mailTransporter.sendMail(mailDetails, (err, data) => {
		if (err) {
			console.log("Error Occurs", err);
		} else {
			console.log("Email sent successfully");
		}
	});
};
