import emailjs from '@emailjs/browser'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export interface ContactEmailParams {
  from_name: string
  last_name: string
  from_email: string
  phone: string
  message: string
}

export async function sendContactEmail(params: ContactEmailParams): Promise<void> {
  const templateParams: Record<string, string> = {
    from_name: params.from_name,
    last_name: params.last_name,
    from_email: params.from_email,
    phone: params.phone,
    message: params.message,
  }

  const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

  if (result.status !== 200) {
    throw new Error(result.text)
  }
}
