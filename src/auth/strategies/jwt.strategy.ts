import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // JwtStrategy sınıfı, JWT tabanlı kimlik doğrulama işlemleri için kullanılır.
    /**
     * JwtStrategy sınıfı, JWT tabanlı kimlik doğrulama işlemleri için kullanılır.
     * @param authService - AuthService sınıfının bir örneği.
     */
    constructor(private readonly authService: AuthService) {
        super({
            //returnJwtExtractor gelen HTTP isteklerinden(cookie) JWT'yi almak için kullanılan bir metot.
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false, //token'ların son kullanma tarihleri kontrol edilir.
            secretOrKey: process.env.JWT_SECRET, //Doğrulanması için kullanılacak gizli anahtar. 
        });
    }

    /**
     * Her kimlik doğrulama talebinde çağrılır ve JWT payload'ını doğrular.
     * @param jwtPayload - JWT'nin payload kısmı.
     * @returns Doğrulanmış kullanıcı veya hata fırlatır.
     */
    // Her kimlik doğrulama talebinde çağrılır ve JWT payload'ını doğrular.
    async validate(jwtPayload: JwtPayload) {
      const user = await this.authService.validateUser(jwtPayload);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
}