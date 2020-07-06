import { Column, Model, Table, HasMany, DataType, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { StudentEntity } from './student.entity';

@Table({
  tableName: 'class'
})
export class ClassStudentEntity extends Model<ClassStudentEntity> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
    field: 'code'
  })
  code: string;

  @Column({
    allowNull: false,
    field: 'name'
  })
  name: string;

  @Column({
    allowNull: false,
    field: 'description'
  })
  description: string;

  @HasMany(() => StudentEntity, 'classId')
  students: StudentEntity[];

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  public createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  public updatedAt: Date;

  @DeletedAt
  @Column({ field: 'daleted_at', type: DataType.DATE })
  public deletedAt: Date;

}