import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('citext', { unique: true })
  @Field()
  email: string;

  @Column('varchar', { length: 50 })
  @Field()
  firstName: string;

  @Column('varchar', { length: 50 })
  @Field()
  lastName: string;

  @Column('text')
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
