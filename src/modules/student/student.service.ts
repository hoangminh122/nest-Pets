import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { StudentEntity } from "../../entities/student.entity";
import { StudentDTO } from "./dto/student.dto";

@Injectable()
export class StudentService {
    constructor(
        @Inject('STUDENT_REPOSITORY') private studentRepository: typeof StudentEntity
    ) { }

    async showAll(): Promise<StudentEntity[]> {
        return await this.studentRepository.findAll<StudentEntity>();
    }

    async findById(id: string): Promise<StudentEntity> {
        let student = await this.studentRepository.findOne({
            where: {
                id
            }
        });
        return student;

    }

    async create(data: StudentDTO) {
        const student = await this.studentRepository.create(data);
        return student;
    }

    async update(id: string, data: StudentDTO) {
        try {
            let todo = await this.studentRepository.findOne({
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
            await this.studentRepository.update(data, { where: { id } });
            return await this.studentRepository.findOne({
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
        await this.studentRepository.destroy({
            where: {
                id
            }
        })
        return { deleted: true };
    }

}