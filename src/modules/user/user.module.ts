import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/use.entity";


@Module({
    imports: [
    ],
    controllers: [UserController],
    providers: [UserService, {
        provide: 'USER_REPOSITORY',
        useValue: UserEntity
    }],
    exports: [UserService]
})
export class UserModule {

}