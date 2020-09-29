import { Field, ID, ObjectType } from '@project-decorators/type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column('citext', { unique: false })
  public email: string;

  @Field()
  @Column('varchar', { length: 50 })
  public firstName: string;

  @Field()
  @Column('varchar', { length: 50 })
  public lastName: string;

  @Field()
  @Column('text')
  public password: string;

  @Field()
  @Column('bool', { default: false })
  public confirmed: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
