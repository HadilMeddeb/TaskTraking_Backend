import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { emailConfigData } from "../config/ConfigData";
import { emailTemplate } from "./emailTemplate";
import { Request, Response } from "express";
// Configure your email service settings

export const sendEmailController = async (req: Request, res: Response) => {
  console.log("trarrarararararra");
  const recievers = ["meddeb.hadil.1999@gmail.com"];
  const emailContent = "this is a testing email";
  const emailSubject = "testing email";
  const result = sendEmail(recievers, emailContent, emailSubject);
  res.status(200).json({ result });
};

export const sendEmail = (
  recievers: string[],
  subject: string,
  emailContent: string 
) => {

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: emailConfigData.email,
        pass: emailConfigData.password,
      },
    })
  );
  // Deifne mailing options like Sender Email and Receiver.

  recievers.map((reciever) => {
    var mailOptions = {
      from: emailConfigData.email,
      to: reciever,
      subject: subject,
      html: emailTemplate(subject,emailContent),
    };

    // Send an Email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error :", error)
        return error;
      } else {
        console.log(info);
        return info;
      }
    });
  });
};
