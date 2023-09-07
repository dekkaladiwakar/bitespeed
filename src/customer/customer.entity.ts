import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
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

@Entity('customers')
@Index('email_index', ['email'])
@Index('phone_index', ['phoneNumber'])
@Index('linkPrecedence_index', ['linkPrecedence'])
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  linkedId: number;

  @Column({ type: 'enum', enum: ['primary', 'secondary'], default: 'primary' })
  linkPrecedence: 'primary' | 'secondary';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
