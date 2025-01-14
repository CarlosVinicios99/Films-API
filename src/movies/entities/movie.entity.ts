import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Director } from "./director.entity";

@Entity('movies')
export class Movie {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  category: string

  @Column()
  year: number

  @JoinColumn()
  @ManyToOne(() => Director, {cascade: false})
  director: Director
}