import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { UserEntity } from "../../entities/use.entity";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(
        @Inject('USER_REPOSITORY') private userRepository: typeof UserEntity
    ) { }

    async showAll(): Promise<UserEntity[]> {
        return await this.userRepository.findAll<UserEntity>();
    }

    async findById(id: string): Promise<UserEntity> {
        let user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        let user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        return user;
    }

    async create(data: UserDTO) {
        data.password = await this.getHash(data.password);
        const user = await this.userRepository.create(data);
        return user;
    }

    async update(id: string, data: UserDTO) {
        try {
            let todo = await this.userRepository.findOne({
                where: {
                    id
                }
            });
            if (!todo.id) {
                // tslint:disable-next-line:no-console
                // console.error('user doesn\'t exist');
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Can not found user"
                }, HttpStatus.NOT_FOUND)
            }
            await this.userRepository.update(data, { where: { id } });
            return await this.userRepository.findOne({
                where: {
                    id
                }
            });
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'update database error'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: string) {
        await this.userRepository.destroy({
            where: {
                id
            },
            // force:true
        })
        return { deleted: true };
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }


}