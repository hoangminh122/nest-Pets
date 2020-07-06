import { Column, Model, Table, HasMany, DataType, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

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
    field: 'email'
  })
  email: string;

  @Column({
    allowNull: false,
    field: 'username'
  })
  username: string;

  @Column({
    allowNull: false,
    field: 'password'
  })
  password: string;

  @Column({
    allowNull: false,
    field: 'avatar_id'
  })
  avatarId: string

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