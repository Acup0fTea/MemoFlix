import Message from "../models/message.model.js";
import responseHandler from "../handlers/response.handler.js";
import nodemailer from "nodemailer";

export const createMessage = async (req, res) => {
  try {
    const { subject, sender, recipient, content } = req.body;
    const newMessage = new Message({ subject, sender, recipient, content });
    const savedMessage = await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prajonklat@gmail.com",
        pass: "gmffdfdquctewxqu",
      },
    });

    const mailOptions = {
      from: `${sender}`,
      to: `${recipient}`,
      subject: `${subject}`,
      text: `You have received a new message:\n\n${content}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        response.redirect("/success");
        console.log("Email sent:", info.response);
      }
    });

    responseHandler.created(res, savedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    responseHandler.error(res);
  }
};
