import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        // SMTP sunucu ayarlarınızı burada yapılandırın.
        this.transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'your-email@example.com', // SMTP sunucusundaki kullanıcı adınız
                pass: 'your-password', // SMTP sunucusundaki şifreniz
            },
        });
    }

    async sendVerificationEmail(userEmail: string, verificationToken: string) {
        const verificationUrl = `http://yourfrontenddomain.com/verify?token=${verificationToken}`;

        // E-posta içeriğini ve ayarlarını yapılandırın.
        const mailOptions = {
            from: '"Your App Name" <your-email@example.com>', // gönderici adresi
            to: userEmail, // alıcı adresi
            subject: 'Verify Your Email', // Konu satırı
            text: 'Please click on the following link to verify your email: ' + verificationUrl, // düz metin gövde
            html: `<p>Please click on the following link to verify your email:</p><a href="${verificationUrl}">${verificationUrl}</a>`, // HTML gövde
        };

        // E-postayı gönder ve sonucu döndür
        return this.transporter.sendMail(mailOptions);
    }
}
