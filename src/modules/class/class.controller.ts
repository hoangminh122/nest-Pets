import { Controller, Get, Post, ValidationPipe, Body, Delete, Param, Put, Query } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { ClassService } from "./class.service";
import { ClassDTO } from "./dto/class.dto";
import { ClassStudentEntity } from "src/entities/class.entity";

@ApiTags('class')
@Controller('class')
export class ClassController {
    constructor(
        private classService: ClassService
    ){ }
    @Get()
    showAllUser(){
        return this.classService.showAll();
    }

    @Get('GetById')
    showUserById(@Query('id') id:string){
        return this.classService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Create new user success !.'})
    @ApiBody({ type: [ClassStudentEntity] })
    createUser(@Body() data: ClassDTO){
        return this.classService.create(data);
    }

    @Delete(':id')
    async destroyUser(@Param('id') id: string){
        return this.classService.destroy(id);
    }

    @Put(':id')
    @ApiBody({ type: [ClassStudentEntity] })
    updateUser(@Param('id') id:string,@Body() data :ClassDTO){
        return this.classService.update(id,data);
    }

}