import nodemailer from 'nodemailer'

export const generateMFA = (user) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    user.mfaCode = code.toString();
    return code.toString();
}

  
export const validateMFA = async (user, mfaCode) => {
    return user.mfaCode === mfaCode;
}

export const updateUser = async (user) => {
    return await user.save();
}
  

export const sendMFAEmail = (email, mfaCode) => {

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9fd8e7279c0dd0",
          pass: "be444ee145777d"
        }
      });

    const mailData = `<h1>Your MFA code is: ${mfaCode}</h1>`

    const mailOptions = {
        from: 'c7b53026d9-34c435@inbox.mailtrap.io',
        name: 'c7b53026d9-34c435@inbox.mailtrap.io',
        to: email,
        subject: 'MFA Code',
        html: mailData
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending MFA email:', error);
        } else {
            console.log('MFA email sent:', info.response);
        }
    });
}