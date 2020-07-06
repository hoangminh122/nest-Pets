import { Controller, Get, Post, Body, Delete, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { StudentDTO } from "./dto/student.dto";
import { StudentEntity } from "../../entities/student.entity";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@ApiTags('student')
@Controller('student')
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    showAllUser() {
        return this.studentService.showAll();
    }
    @Get('GetById')
    showUserById(@Query('id') id: string) {
        return this.studentService.findById(id);
    }

    @Post(':id')
    @ApiResponse({ status: 200, description: 'Create new user success !.' })
    @ApiBody({ type: [StudentEntity] })
    createUser(@Param('id') id: string, @Body() data: StudentDTO) {
        data.classId = id;
        return this.studentService.create(data);
    }

    @Delete(':id')
    async destroyUser(@Param('id') id: string) {
        return this.studentService.destroy(id);
    }

    @Put(':id')
    @ApiBody({ type: [StudentEntity] })
    updateUser(@Param('id') id: string, @Query('id-class') idClass: string, @Body() data: StudentDTO) {
        data.classId = idClass;
        return this.studentService.update(id, data);
    }

}