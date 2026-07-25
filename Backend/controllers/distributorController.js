const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ADMIN_EMAIL = 'dailyreport015@gmail.com';

exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, contactNo, email, subject, message } = req.body;

    if (!firstName || !lastName || !contactNo || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // 1. Mail to Admin (dailyreport015@gmail.com)
    await transporter.sendMail({
      from: `"Zinnie Distributor Form" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Distributor Enquiry: ${subject}`,
      html: `
        <h2>New Distributor Partnership Enquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Contact No.:</strong> ${contactNo}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // 2. Confirmation mail to the user
    await transporter.sendMail({
      from: `"Zinnie" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your distributor enquiry, ${firstName}!`,
      html: `
        <h2>Thank you for your interest in becoming a Zinnie Distributor!</h2>
        <p>Hi ${firstName},</p>
        <p>We've received your enquiry regarding "<strong>${subject}</strong>" and our team will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p>Cheers,<br/>Team Zinnie</p>
      `,
    });

    return res.status(200).json({ message: "Thank you! We'll be in touch soon." });
  } catch (error) {
    console.error('❌ Distributor form email error:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};