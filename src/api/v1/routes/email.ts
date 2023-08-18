import { Router } from 'express'
import { sentEmail } from '../controller/sent-email'


const router = Router()

router.post('/', sentEmail)


export default router