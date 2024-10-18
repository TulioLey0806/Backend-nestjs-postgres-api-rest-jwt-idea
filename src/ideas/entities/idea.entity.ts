import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Idea {

    //@PrimaryGeneratedColumn()
    @Column({primary: true, generated: true})
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    contents: string;
  
    @ManyToOne(() => Category, (category) => category.id, {
        // cascade: true,
        eager: true, // para que traiga las raza al hacer un findOne
      })
      category: Category;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: User;
    
    @Column()
    userEmail: string;

    @OneToMany(() => Comment, (comment) => comment.idea)
    comments: Comment[];      

    @DeleteDateColumn()
    deletedAt: Date;
 }
