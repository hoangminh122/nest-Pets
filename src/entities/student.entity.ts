import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript"
import { ClassStudentEntity } from "./class.entity";

@Table({
    tableName: 'student',
})
export class StudentEntity extends Model<StudentEntity> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
        field: 'student_id'
    })
    studentId: string;

    @Column({
        allowNull: false,
        field: 'class_id'
    })
    classId: string;

    @Column({
        allowNull: false,
        field: 'first_name'
    })
    firstName: string;

    @Column({
        allowNull: false,
        field: 'last_name'
    })
    lastName: string;

    @Column({
        allowNull: false,
        field: 'dod'
    })
    dod: Date;

    @Column({
        allowNull: false,
        field: 'sex'
    })
    sex: string;

    @Column({
        allowNull: false,
        field: 'address'
    })
    address: string;

    @Column({
        allowNull: false,
        field: 'avatar_id'
    })
    avatarId: string;

    @Column({
        allowNull: false,
        field: 'active'
    })
    active: boolean;

    @ForeignKey(() => ClassStudentEntity)
    @Column({
        field: 'class_id'
    })
    ClassId: number;

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