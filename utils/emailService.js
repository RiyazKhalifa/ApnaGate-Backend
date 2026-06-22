const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendNewUserCredentialsEmail = async (email, password, userName) => {
    const loginUrl = process.env.FRONTEND_URL;

    const message = `
        Hello ${userName || 'User'},

        Your account has been created successfully. You can login using the credentials below:

        Email: ${email}
        Password: ${password}

        Login here: ${loginUrl}

        Please change your password after your first login for security reasons.

        Regards,
        EWW Team
    `;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to EWW</h2>
            <p>Hello <strong>${userName || 'User'}</strong>,</p>
            <p>Your account has been created successfully. You can login using the credentials below:</p>
            <table style="margin: 20px 0; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Password:</td>
                    <td style="padding: 8px;">${password}</td>
                </tr>
            </table>
            <p style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Login Now</a>
            </p>
            <p>Please change your password after your first login for security reasons.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">Regards,<br>EWW Team</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"EWW Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your New EWW Account Credentials",
        text: message,
        html: htmlMessage
    });
};

const sendLoginAlertEmail = async (email, deviceInfo, ipAddress, token) => {
    const forceLogoutUrl = `${process.env.FRONTEND_URL}/force-logout?token=${token}`;

    const message = `
        Hello Admin,

        A new login to your account was detected:
        Device: ${deviceInfo}
        IP: ${ipAddress}
        Time: ${new Date().toLocaleString()}

        If this wasn't you, please click the button below to logout from this device.

        Force Logout: ${forceLogoutUrl}

        Regards,
        EWW Team
    `;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Login Detected</h2>
            <p>Hello Admin,</p>
            <p>A new login to your account was detected:</p>
            <ul>
                <li><strong>Device:</strong> ${deviceInfo}</li>
                <li><strong>IP Address:</strong> ${ipAddress}</li>
                <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
            <p>If this wasn't you, please click the button below to force logout from this device:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${forceLogoutUrl}" style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Force Logout This Device</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${forceLogoutUrl}</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">Regards,<br>EWW Team</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"EWW Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "New Login Detected",
        text: message,
        html: htmlMessage
    });
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const message = `
        Hello ${userName || 'Admin'},
        
        You have requested to reset your password. Please click the link below to reset your password:
        
        ${resetUrl}
        
        This link will expire in 1 hour for security reasons.
        
        If you did not request this password reset, please ignore this email and your password will remain unchanged.
        
        Regards,
        EWW Team
    `;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello <strong>${userName || 'Admin'}</strong>,</p>
            <p>You have requested to reset your password. Please click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">Regards,<br>EWW Team</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"EWW Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Password Reset Request",
        text: message,
        html: htmlMessage
    });
};

const sendContactReplyEmail = async (email, name, subject, replyText) => {
    const message = `
        Hello ${name},

        Thank you for contacting us. Regarding your inquiry about "${subject}":

        ${replyText}

        If you have any further questions, feel free to reach out.

        Regards,
        EWW Team
    `;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reply to Your Inquiry</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for contacting us. Regarding your inquiry about "<strong>${subject}</strong>":</p>
            <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0;">
                ${replyText.replace(/\n/g, '<br>')}
            </div>
            <p>If you have any further questions, feel free to reach out.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">Regards,<br>EWW Team</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"EWW Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Re: ${subject}`,
        text: message,
        html: htmlMessage
    });
};

module.exports = {
    sendNewUserCredentialsEmail,
    sendLoginAlertEmail,
    sendPasswordResetEmail,
    sendContactReplyEmail
};