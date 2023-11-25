import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";


/* 
 Burada kullanıcı rollerini yönetmek ve yetkilendirmek için bir rol koruma mekanizması (guard) ve bir kullanıcı kontrolcüsü (controller) olusturduk
AuthGuard icin JWT (JSON Web Token) stratejisini kullandik.
Reflector, NestJS'in metadata işlemleri için kullandığı bir sınıftır.
*/

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    /* 
    Bu metot, her istek için çağrılır ve 
        kullanıcının belirli bir role sahip olup olmadığını kontrol eder.

    Kimlik doğrulama başarılı olduğunda, Passport stratejisi kullanıcı nesnesini (user) döndürür ve bu nesne, 
        RolesGuard'ın handleRequest metoduna argüman olarak geçirilir.
    
    `roles` değişkeni, NestJS'in yansıma (reflection) API'si kullanılarak bir controller metodundan (işlemci/handler) alınır.
    */
    handleRequest(err, user, info: Error, context: ExecutionContext) {
        // Mevcut işlemci (handler) için tanımlanmış rolleri alır.
        const roles = this.reflector.get<string>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        //Kullanıcının herhangi bir yetkiye sahip olup olmadığını kontrol eder.
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        if (!user) {
            throw new UnauthorizedException();
        }
        if (!(user.roles && hasRole())) {
            throw new ForbiddenException('Forbidden')
        }
        return user && user.roles && hasRole();
    }
}