//---Multer Setup ----//
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `uploads/`);
	},
	filename: (req, file, cb) => {
		const userId: number = req?.res?.locals?.userId;
		const date = new Date().toISOString();
		console.info({ userId, date, file });

		cb(null, userId + "_" + date + "_" + file.originalname);
	},
});
const upload = multer({ storage });

export default upload;
