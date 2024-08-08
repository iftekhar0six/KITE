const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * function used for mailing purpose
 *
 * @param {object} mailData Data for mail
 * @returns details to be mailed
 */
async function mailer(mailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail(mailData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = mailer;
