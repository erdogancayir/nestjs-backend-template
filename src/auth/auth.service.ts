import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import Cryptr from 'cryptr';
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from 'src/user/interfaces/user.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // Cryptr sınıfı, token'ların şifrelenmesi ve şifresinin çözülmesi işlemleri için kullanılır.
  cryptr: any;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService, ) {
    this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
  }

  async createAccessToken(userId: string) {
    const accessToken = sign({userId}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return this.encryptText(accessToken);
  }

  // JWT payload'ından kullanıcıyı doğrular ve kullanıcıyı döndürür.
  async validateUser(jwtPayload: JwtPayload): Promise<any> {
      const user = await this.userModel.findOne({_id : jwtPayload.userId, verified: true});
      if (!user) {
          throw new UnauthorizedException('User Not Found');
      }
      return user;
  }

   // Gelen HTTP isteklerinden JWT token'ını çıkarır.
  private jwtExtractor(request) {
      let token = null;
      if (request.header('x-token')) {
      token = request.get('x-token');
    } else if (request.headers.authorization) {
      token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
    } else if (request.body.token) {
      token = request.body.token.replace(' ', '');
    }
      if (request.query.token) {
      token = request.body.token.replace(' ', '');
    }
      const cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
      if (token) {
        try {
          token = cryptr.decrypt(token);
        } catch (err) {
          throw new BadRequestException('Bad request.');
        }
    }
      return token;
  }

  returnJwtExtractor() {
    return this.jwtExtractor;
  }
  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}