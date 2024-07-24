import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  role: string;
}
