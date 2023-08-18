import { createTransport } from 'nodemailer'

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);
const user = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_PASSWORD;


const config = {
    host,
    port,
    secure: true,
    auth: {
        user,
        pass
    },
    tls: {
        rejectUnauthorized: false,
    },
}


// Nodemailer transporter
export const transporter = createTransport(config);