import { Controller, Get, Post, ValidationPipe, Body, Delete, Param, Put, Query, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./jwt/local-auth.guard";
import { LocalStrategy } from "./jwt/local.strategy";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { UserEntity } from "../../entities/use.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private localStrategy: LocalStrategy) {
    }
    //    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiResponse({ status: 200, description: 'Create new user success !.' })
    @ApiBody({ type: [UserEntity] })
    async login(@Body() req) {
        let user = this.localStrategy.validate(req.email, req.password);
        console.log(req)
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}