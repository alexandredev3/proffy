import Mail from '../../lib/Mail';

interface User {
  data: {
    user: {
      name: string;
      email: string;
    }
    token: string;
  }
}

class RecoveryMail {
  get key(): string {
    return 'RecoveryMail'
  }

  async handle({ data }: User) {
    const { name, email } = data.user;
    const { token } = data;

    await Mail.sendMail({
      to: `${name} - <${email}>`,
      from: 'proffy@proffy.com.br',
      subject: 'Definir senha',
      template: 'recovery',
      context: {
        user: name,
        token
      },
    });
  }
}

export default new RecoveryMail();