import {Router} from 'express'
import emailAccountRouter from './account'
import sentEmail from './email'



const router = Router()

router.use('/accounts', emailAccountRouter)
router.use('/sent-mail', sentEmail)

export default router