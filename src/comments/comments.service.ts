import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Idea } from '../ideas/entities/idea.entity';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(Idea)
    private readonly ideasRepository: Repository<Idea>
  ) {}
 
  async create(createCommentDto: CreateCommentDto, user: ActiveUserInterface) {
    const idea = await this.validateIdea(createCommentDto.idea);

    if (!idea) {
      throw new BadRequestException('Idea not found');
    }
   
    const comment = this.commentsRepository.create({
      contents: createCommentDto.contents,
      idea: idea,
      userEmail: user.email,
    });
    return await this.commentsRepository.save(comment);
  }

  async findAll() {
    return await this.commentsRepository.find();
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (!comment){
      throw new BadRequestException('Comment not found');
    }
    this.validateOwnership(comment, user)
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: ActiveUserInterface) {
    await this.findOne( id, user );

    return await this.commentsRepository.update(id, {
      ...updateCommentDto,
      idea: updateCommentDto.idea ? await this.validateIdea(updateCommentDto.idea) : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne( id, user );
    return await this.commentsRepository.softDelete({ id });
  }

  private validateOwnership(comment: Comment, user: ActiveUserInterface) {
    //user.role !== Role.ADMIN &&
    if (comment.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateIdea(idea: string) {
    const ideaEntity = await this.ideasRepository.findOneBy({ title: idea });
  
    if (!ideaEntity) {
      throw new BadRequestException('Idea not found');
    }
    return ideaEntity;
  }  
}
