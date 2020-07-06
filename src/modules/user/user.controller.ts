import { Controller, Get, Post, ValidationPipe, Body, Delete, Param, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UserEntity } from "src/entities/use.entity";
import { UserDTO } from "./dto/user.dto";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    showAllUser() {
        return this.userService.showAll();
    }
    @Get('GetById')
    showUserById(@Query('id') id: string) {
        return this.userService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Create new user success !.' })
    @ApiBody({ type: [UserEntity] })
    createUser(@Body() data: UserDTO) {
        return this.userService.create(data);
    }

    @Delete(':id')
    async destroyUser(@Param('id') id: string) {
        return this.userService.destroy(id);
    }

    @Put(':id')
    @ApiBody({ type: [UserEntity] })
    updateUser(@Param('id') id: string, @Body() data: UserDTO) {
        return this.userService.update(id, data);
    }

}