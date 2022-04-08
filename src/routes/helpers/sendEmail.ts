// //batchSend.js
// import SibApiV3Sdk from "sib-api-v3-sdk";

// const apikey = process.env.EMAILAPIKEY;
// SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = "";

// new SibApiV3Sdk.TransactionalEmailsApi()
// 	.sendTransacEmail({
// 		sender: { email: "sendinblue@sendinblue.com", name: "Sendinblue" },
// 		subject: "This is my default subject line",
// 		htmlContent:
// 			"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
// 		params: {
// 			greeting: "This is the default greeting",
// 			headline: "This is the default headline",
// 		},
// 		messageVersions: [
// 			//Definition for Message Version 1
// 			{
// 				to: [
// 					{
// 						email: "bob@example.com",
// 						name: "Bob Anderson",
// 					},
// 					{
// 						email: "anne@example.com",
// 						name: "Anne Smith",
// 					},
// 				],
// 				htmlContent:
// 					"<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
// 				subject: "We are happy to be working with you",
// 			},

// 			// Definition for Message Version 2
// 			{
// 				to: [
// 					{
// 						email: "jim@example.com",
// 						name: "Jim Stevens",
// 					},
// 					{
// 						email: "mark@example.com",
// 						name: "Mark Payton",
// 					},
// 					{
// 						email: "andrea@example.com",
// 						name: "Andrea Wallace",
// 					},
// 				],
// 			},
// 		],
// 	})
// 	.then(
// 		function (data) {
// 			console.log(data);
// 		},
// 		function (error) {
// 			console.error(error);
// 		}
// 	);
