import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { StudentEntity } from "src/entities/student.entity";


@Module({
    imports: [

    ],
    controllers: [StudentController],
    providers: [StudentService, {
        provide: 'STUDENT_REPOSITORY',
        useValue: StudentEntity
    }],
    exports: [StudentService]
})
export class StudentModule {

}