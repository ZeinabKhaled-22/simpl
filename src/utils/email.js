// import module
import nodemailer from 'nodemailer'

// sendEmail
export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zezekhaled13@gmail.com',
            pass: 'llop rssz ywfk tfxt'
        }
    })
    await transporter.sendMail({
        to,
        from: "'<Simpl>'zezekhaled13@gmail.com",
        subject,
        html
    })
}