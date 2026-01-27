import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { TemplateAdapter } from '@nestjs-modules/mailer';
import { Edge } from 'edge.js';

class EdgeAdapter implements TemplateAdapter {
  private edge = new Edge();

  constructor(templateDir: string) {
    this.edge.mount(templateDir);
  }

  compile(mail: any, callback: any): void {
    const templatePath = mail.data.template;

    // Render template menggunakan Edge
    this.edge
      .render(templatePath, mail.data.context)
      .then((html) => {
        mail.data.html = html;
        callback();
      })
      .catch((err) => callback(err));
  }
}

const emailTemplateDir = join(process.cwd(), 'assets/templates/emails');

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'dpn.p3i@gmail.com',
          pass: 'hilnzuetqqwdklez',
        },
      },
      defaults: {
        from: '"Clinic Pradana Workshop" <no-reply@gmail.com>',
      },
      template: {
        dir: emailTemplateDir,
        adapter: new EdgeAdapter(emailTemplateDir),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class EmailModule {}
