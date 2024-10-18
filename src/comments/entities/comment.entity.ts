import { User } from "../../users/entities/user.entity";
import { Idea } from "../../ideas/entities/idea.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    contents: string;
  
    @ManyToOne(() => Idea, (idea) => idea.id, {
        // cascade: true,
        eager: true, // para que traiga la idea al hacer un findOne
    })
    idea: Idea;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: User;
    
    @Column()
    userEmail: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
