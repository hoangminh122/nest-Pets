import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./jwt/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {

}