import { Idea } from "src/ideas/entities/idea.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

   @OneToMany(() => Idea, (idea) => idea.category)
   ideas: Idea[];

  @DeleteDateColumn()
  deletedAt: Date;
}
