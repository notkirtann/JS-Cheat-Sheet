import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'wilfredo.ullrich@ethereal.email',
        pass: 'xXR3weq9fmd2FeYgGG'
    }
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Kirtan\'s Nodemailer" <wilfredo.ullrich@ethereal.email>',
    to: "talk2kirtan7@gmail.com, vamshi973133@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
})();