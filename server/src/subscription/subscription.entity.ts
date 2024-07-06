import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmationToken: string;
}
