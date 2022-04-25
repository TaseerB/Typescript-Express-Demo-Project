import e, { Request, Response } from "express";
import nodemailer from "nodemailer";
import Hashids from "hashids";
import dotenv from "dotenv";

dotenv.config();
const password = process?.env?.PASSWORD;
const fromEmail = process?.env?.FROM_EMAIL;
const secretSalt = process?.env?.SECRETENCODETEXT;

export const somethingWentWrong = (req: Request, res: Response) => {
	res.status(500).json({ message: "something went Wrong." });
	return;
};

export const sendMail = async (inputObj: any) => {
	console.info({ inputObj });
	const { email, text, html, subject } = inputObj;

	let mailTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: fromEmail,
			pass: password,
		},
	});

	// Setting credentials
	let mailDetails = {
		from: fromEmail,
		to: email,
		subject: subject || "No Subject Found",
		text,
		html,
		// html,
		// 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n',
	};

	// Sending Email
	console.info("--- sending email ---");
	return mailTransporter.sendMail(mailDetails);
};

export const encodeIds = (inpObj: any) => {
	console.info({ objectToEncode: inpObj });

	const hashids = new Hashids(secretSalt, 5);

	if (inpObj.length > 0) {
		let objKeys = inpObj[0];
		objKeys = Object.keys(objKeys?.dataValues);

		// getting name of key from object
		let idKey: any = objKeys.filter((objKey: string) => {
			return objKey.includes("Id");
		});
		console.info({ key: idKey[0] });
		const getIdkey = idKey[0];

		inpObj.forEach((obj: any) => {
			const getValue = obj?.dataValues[getIdkey];
			console.info({ check: typeof getValue, getValue });
			const encodedValue = hashids.encode(getValue);
			console.info({ encodedValue });
			obj.dataValues[getIdkey] = encodedValue;
		});
	} else {
		let objKeys = inpObj;
		objKeys = Object.keys(objKeys?.dataValues);

		// getting name of key from object
		let idKey: any = objKeys.filter((objKey: string) => {
			return objKey.includes("Id");
		});
		console.info({ key: idKey[0] });
		const getIdkey = idKey[0];

		const getValue = inpObj?.dataValues[getIdkey];
		console.info({ check: typeof getValue, getValue });
		const encodedValue = hashids.encode(getValue);
		console.info({ encodedValue });
		inpObj.dataValues[getIdkey] = encodedValue;
	}
};

export const decodeIds = (id: any) => {
	console.info({ idToDecode: id });
	const hashids = new Hashids(secretSalt, 5);

	const getDecodedId = hashids.decode(id);

	console.info({ getDecodedId });

	return Number(getDecodedId[0]);
};
