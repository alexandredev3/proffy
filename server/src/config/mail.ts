export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT as unknown as number,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  default: {
    from: 'Equipe Proffy <noreply@proffy.com>',
  }
}