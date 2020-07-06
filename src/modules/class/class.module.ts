import { Module } from "@nestjs/common";
import { ClassStudentEntity } from "../../entities/class.entity";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";


@Module({
    imports: [
    ],
    controllers: [ClassController],
    providers: [ClassService, {
        provide: 'CLASS_REPOSITORY',
        useValue: ClassStudentEntity
    }],
    exports: [ClassService]
})
export class ClassModule {

}