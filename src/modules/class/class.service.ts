import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { ClassStudentEntity } from "src/entities/class.entity";
import { ClassDTO } from "./dto/class.dto";
import { StudentEntity } from "src/entities/student.entity";

@Injectable()
export class ClassService {
    constructor(
        @Inject('CLASS_REPOSITORY') private classRepository: typeof ClassStudentEntity
    ) { }

    async showAll(): Promise<ClassStudentEntity[]> {
        return await this.classRepository.findAll<ClassStudentEntity>({ include: [{model:StudentEntity, as:'students'}]});
    }

    async findById(id: string): Promise<ClassStudentEntity> {
        let classStudent = await this.classRepository.findOne({
            where: {
                id
            }
        });
        return classStudent;
    }

    async create(data: ClassDTO) {
        const classStudent = await this.classRepository.create(data);
        return classStudent;
    }

    async update(id: string, data: ClassDTO) {
        try {
            let todo = await this.classRepository.findOne({
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


            await this.classRepository.update(data, { where: { id } });
            return await this.classRepository.findOne({
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
        await this.classRepository.destroy({
            where: {
                id
            }
        })
        return { deleted: true };
    }

}