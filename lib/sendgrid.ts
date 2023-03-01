import sgMail from '@sendgrid/mail'
import { AppoData } from './types'
import * as dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_APIKEY)

// Sending the code for auth/login
export async function sendCodeByEmail(email: string, code: number) {
	const msg = {
		to: email,
		from: 'leandrom.roldan@gmail.com',
		subject: 'Código de validación',
		html: `<div style={display: "flex", align-items: "center", justify-items: "center", padding: 20px}>
            <img width="200px" height="200px" src="https://res.cloudinary.com/deooec1tp/image/upload/v1676914812/Turnos%20Mendoza/turnos-mendoza_im14jj.png" alt="logo"/>
            <h1>${code}</h1>
            <p>Con este código podés loguearte. Recordá que el mismo es válido durante 10 minutos</p>
        </div>
        `,
	}
	await sgMail.send(msg)
	return true
}

// Sending the message of new contact about a published item
export async function sendAppointmentByEmail(data: AppoData) {
	const msg = {
		to: data.email,
		from: 'appprodigar@gmail.com',
		subject: `Solicitaste un turno con nosotros`,
		html: `<div style={display: "flex", align-items: "center", justify-items: "center", padding: 20px}>
            <img width="200px" height="200px" src="https://res.cloudinary.com/deooec1tp/image/upload/v1676914812/Turnos%20Mendoza/turnos-mendoza_im14jj.png" alt="logo"/>
            <h1>Este es el detalle de tu turno N°: ${data.appoId}</h1>
            <p><b>Tu nombre:</b> ${data.fullName}</p>
            <p><b>Tu email:</b> ${data.email}</p>
            <p><b>Fecha de tu turno:</b> ${data.date}</p>
        </div>
        `,
	}
	await sgMail.send(msg)
	return true
}
