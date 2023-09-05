import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Reference:
// {
// 	id                   Int
//   phoneNumber          String?
//   email                String?
//   linkedId             Int? // the ID of another Contact linked to this one
//   linkPrecedence       "secondary"|"primary" // "primary" if it's the first Contact in the link
//   createdAt            DateTime
//   updatedAt            DateTime
//   deletedAt            DateTime?
// }
@Entity()
export class Customer {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'phone_number',
    nullable: false,
    default: '',
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'linked_id',
    nullable: false,
    default: '',
  })
  linkedId: string;

  @Column({
    name: 'link_preference',
    nullable: false,
    default: '',
  })
  linkPreference: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
