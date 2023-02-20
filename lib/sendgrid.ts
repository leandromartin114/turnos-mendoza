import * as sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_APIKEY)
export { sgMail }
