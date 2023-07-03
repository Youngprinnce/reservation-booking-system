import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configService.get('GMAIL_USER'),
      pass: this.configService.get('GMAIL_PASSWORD'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Reservation Notification',
      text,
    });
  }
}
