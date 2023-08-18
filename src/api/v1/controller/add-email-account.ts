import type { Request, Response } from 'express'

import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import { validate } from "class-validator"
import { AppDataSource } from '../../../connection/data-source'
import { Account } from '../../../entity/account'
import { createTransport } from 'nodemailer';

// To add an email account
export const addEmailAccount = async (req: Request, res: Response) => {
    try {
        const account = AppDataSource.getRepository(Account).create(req.body)
        // validate the repsonse body
        const errors = await validate(account)
        // Create a transporter using the SMTP transport
        if (errors.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST, errors });
        }
        const transporter = createTransport({
            host: req.body['smtpHost'], // Replace with your SMTP server
            port: req.body['smtpPort'],
            secure: true,
            auth: {
                user: req.body['username'], // Replace with your email
                pass: req.body['password'], // Replace with your email password or app-specific password
            },
        });
        // to validate the account
        // Please comment if you don't want to validate the account other wise it will wait for the account to be validated
        await transporter.verify();
        const results = await AppDataSource.getRepository(Account).save(account)
        return res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED, results });
    } catch (error) {
        console.error(error)
    }
}