
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/index';
import { UserEntity } from '../../entities/use.entity';
import {ClassStudentEntity} from '../../entities/class.entity'
import { StudentEntity } from 'src/entities/student.entity';
export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        config = databaseConfig.production;
        break;
      case 'dev':
      case 'development':
        config = databaseConfig.development;
        break;
      default:
        config = databaseConfig.development;
    }

    const sequelize = new Sequelize({ ...config });
    sequelize.addModels([UserEntity,ClassStudentEntity,StudentEntity]);
    await sequelize.sync({ force: false });
    return sequelize;
  },
};
