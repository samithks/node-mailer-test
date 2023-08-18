import type { Request, Response } from 'express'
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import z from 'zod'
import { AppDataSource } from '../../../connection/data-source'
import { Account } from '../../../entity/account'
import { transporter } from '../../../connection/mail-transport'



// Create a schema for the sent email
const sentEmailSchema = z.object({
    to: z.string().email(),
    cc: z.string().email().optional(),
    bcc: z.string().email().optional(),
    subject: z.string(),
    body: z.string()
});

// for email tracking
const trackingSettings = {
    clickTracking: { enable: true, enableText: true },
    openTracking: { enable: true },
}

// To sent an email to the recipient
export const sentEmail = async (req: Request, res: Response) => {
    const { to, subject, body, cc, bcc } = sentEmailSchema.parse(req.body)
    
    const results = await AppDataSource.getRepository(Account).find({ take: 1 })
    console.log(results)
    if (Array.isArray(results) && results.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Account not found', results: null });
    }
    const { username } = results[0]
    const mailOptions = {
        from: username,
        to,
        subject,
        cc,
        bcc,
        text: body,
        trackingSettings
    };
    const response = await transporter.sendMail(mailOptions);
    return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: response });
}