import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Language } from '../enums';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column('citext', { unique: true })
  public email: string;

  @Field()
  @Column('varchar', { length: 50 })
  public firstName: string;

  @Field()
  @Column('varchar', { length: 50 })
  public lastName: string;

  @Column('text')
  public password: string;

  @Field()
  @Column('bool', { default: false })
  public confirmed: boolean;

  @Field()
  @Column('enum', { enum: Language, nullable: true })
  public preferredLanguage: Language;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
