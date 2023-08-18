import { Router } from 'express'
import { addEmailAccount } from '../controller/add-email-account'
import { getEmailAccountByName } from '../controller/get-email-account-by-name'


const router = Router()

router.post('/', addEmailAccount)
router.get('/:name', getEmailAccountByName)


export default router