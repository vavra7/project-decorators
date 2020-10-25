import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  TestAccount,
  Transporter
} from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Service } from 'typedi';

@Service()
export class NodemailerService {
  private account: TestAccount;
  private transporter: Transporter;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.account = await createTestAccount();
    this.transporter = await createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });
  }

  public async sendEmail(mailOptions: Mail.Options): Promise<void> {
    const info = await this.transporter.sendMail(mailOptions);
    console.log('Preview URL: %s', getTestMessageUrl(info));
  }
}
