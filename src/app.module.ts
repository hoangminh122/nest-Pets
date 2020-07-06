import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassModule } from './modules/class/class.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,UserModule,AuthModule,ClassModule,StudentModule
  ],
})
export class AppModule { }
