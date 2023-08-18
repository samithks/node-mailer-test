import type { Request, Response } from 'express'

import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import { AppDataSource } from '../../../connection/data-source'
import { Account } from '../../../entity/account'

// To get an email account by name
export const getEmailAccountByName = async (req: Request, res: Response) => {
    const account = await AppDataSource.getRepository(Account).findOneBy({ name: req.path['name'], })
    return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: account });
}