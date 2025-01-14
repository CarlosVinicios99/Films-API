import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('directors')
export class Director {

  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  name: string

  @Column({name: 'date_of_birth', type: 'timestamp'})
  dateOfBirth: Date

  @Column()
  nationality: string
}