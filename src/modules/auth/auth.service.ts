import { Injectable} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    private saltRounds = 10;
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && this.comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(attempt: string | undefined, passwordHash: string | undefined): Promise<boolean> {
        let attemptHash = this.getHash(attempt);
        return await bcrypt.compare(attempt, passwordHash)
    }


}