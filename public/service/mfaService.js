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
        host: process.env.MFA_OUTGOING_HOST,
        port: process.env.MFA_OUTGOING_PORT,
        auth: {
          user: process.env.MFA_OUTGOING_EMAIL,
          pass: process.env.MFA_OUTGOING_PASSWORD
        }
      });

    const mailData = `<h1>Your MFA code is: ${mfaCode}</h1>`

    const mailOptions = {
        from: 'connect@aicarer.com.au',
        name: 'connect@aicarer.com.au',
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