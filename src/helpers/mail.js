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

/**
 * function to send mail when admin signup
 *
 * @param {string} fName first name of admin
 * @param {string} lName last name of admin
 * @param {string} mobile mobile number of admin
 * @param {string} email email address of admin
 * @param {string} password password of the admin
 * @returns the mail to admin's mail address
 */
async function adminSignupMail(fName, lName, mobile, email, password) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Admin Registration to KITE forum",
    text: `Dear ${fName},
    You have been registered to KITE as an Admin
    Name: ${fName} ${lName}
    Mobile No.: ${mobile}
    email: ${email}
    password: ${password}
    `,
  };

  return mailer(mailData);
}

/**
 * function to send mail when user signup
 *
 * @param {string} fName first name of user
 * @param {string} lName last name of user
 * @param {string} mobile mobile number of user
 * @param {string} email email address of user
 * @param {string} password password of the user
 * @returns the mail to user's mail address
 */
async function userSignupMail(fName, lName, mobile, email, password) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Registration to KITE forum",
    text: `Dear ${fName},
    You have been registered to KITE
    Name: ${fName} ${lName}
    Mobile No.: ${mobile}
    email: ${email}
    password: ${password}
    `,
  };

  return mailer(mailData);
}

/**
 * function to send mail when user update profile
 *
 * @param {string} fName first name of user
 * @param {string} lName last name of user
 * @param {string} mobile mobile number of user
 * @param {string} email email address of user
 * @param {string} password password of the user
 * @returns the mail to user's mail address
 */
async function userUpdateMail(fName, lName, mobile, email, password) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE profile update",
    text: `Dear ${fName},
        Your profile has been updated
        Name: ${fName} ${lName}
        Mobile No.: ${mobile}
        email: ${email}
        password: ${password}
        `,
  };

  return mailer(mailData);
}

/**
 * function to send mail when user deactivate's account
 *
 * @param {string} fName first name of user
 * @param {string} lName last name of user
 * @param {string} mobile mobile number of user
 * @param {string} email email address of user
 * @returns the mail to user's mail address
 */
async function userDeleteMail(fName, lName, mobile, email) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE profile deactivation",
    text: `Dear ${fName},
    Your KITE profile has been deactivated
    Name: ${fName} ${lName}
    Mobile No.: ${mobile}
    email: ${email}
    `,
  };

  return mailer(mailData);
}

/**
 * function to send mail when user deactivate's account
 *
 * @param {string} newPassword the updated password of user
 * @param {string} email the email address to be mailed
 * @returns the mail to user's mail address
 */
async function passwordUpdMail(newPassword, email) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE password update",
    text: `Your password for KITE has been updated to : ${newPassword}`,
  };

  return mailer(mailData);
}

/**
 * function to send otp to the registered mail address
 *
 * @param {string} otp otp for resetting password
 * @param {string} email the email address to be mailed
 * @returns the mail to user's mail address
 */
async function otpMailer(otp, email) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE password reset",
    text: `Reset your password using this otp: ${otp}`,
  };

  return mailer(mailData);
}

/**
 * function to send mail of reset new password
 *
 * @param {string} newPassword the new password
 * @param {string} email the email address to be mailed
 * @returns the mail to user's mail address
 */
async function resetPassword(newPassword, email) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Password updated on KITE",
    text: `Your new updated password for KITE profile is: ${newPassword}`,
  };

  return mailer(mailData);
}

/**
 * function to send mail when admin updates an user's profile
 *
 * @param {string} fName first name of user
 * @param {string} lName last name of user
 * @param {string} mobile mobile number of user
 * @param {string} email email address of user
 * @param {string} password password of the user
 * @returns the mail to user's mail address
 */
async function userUpdByAdmin(fName, lName, mobile, email, password) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE profile update by Admin",
    text: `Dear ${fName},
        Your profile has been updated by admin
        Name: ${fName} ${lName}
        Mobile No.: ${mobile}
        email: ${email}
        password: ${password}
        `,
  };

  return mailer(mailData);
}

/**
 * function to send mail when user account is deactivated by Admin
 *
 * @param {string} fName first name of user
 * @param {string} lName last name of user
 * @param {string} mobile mobile number of user
 * @param {string} email email address of user
 * @returns the mail to user's mail address
 */
async function userAccDeleteByAdmin(fName, lName, mobile, email) {
  const mailData = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "KITE profile deactivation by Admin",
    text: `Dear ${fName},
    Your KITE profile has been deactivated by Admin
    Name: ${fName} ${lName}
    Mobile No.: ${mobile}
    email: ${email}
    `,
  };

  return mailer(mailData);
}

module.exports = {
  mailer: mailer,
  adminSignupMail: adminSignupMail,
  userSignupMail: userSignupMail,
  userUpdateMail: userUpdateMail,
  userDeleteMail: userDeleteMail,
  passwordUpdMail: passwordUpdMail,
  otpMailer: otpMailer,
  resetPassword: resetPassword,
  userUpdByAdmin: userUpdByAdmin,
  userAccDeleteByAdmin: userAccDeleteByAdmin,
};
