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
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // 1. Mail to Admin (dailyreport015@gmail.com)
    await transporter.sendMail({
      from: `"Zinnie Contact Form" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // 2. Confirmation mail to the user
    await transporter.sendMail({
      from: `"Zinnie" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your message, ${firstName}!`,
      html: `
        <h2>Thank you for contacting Zinnie!</h2>
        <p>Hi ${firstName},</p>
        <p>We've received your message regarding "<strong>${subject}</strong>" and our team will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p>Cheers,<br/>Team Zinnie</p>
      `,
    });

    return res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('❌ Contact form email error:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};