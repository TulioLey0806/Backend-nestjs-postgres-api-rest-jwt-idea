import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from './entities/idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  
  async create(createIdeaDto: CreateIdeaDto, user: ActiveUserInterface) {
    const category = await this.validateCategory(createIdeaDto.category);

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const idea = this.ideasRepository.create({
      title: createIdeaDto.title,
      contents: createIdeaDto.contents,
      category: category,
      userEmail: user.email,
    });
    return await this.ideasRepository.save(idea);  
  }

  async findAll() {
    return await this.ideasRepository.find();
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const idea = await this.ideasRepository.findOneBy({ id });
    if (!idea){
      throw new BadRequestException('Idea not found');
    }
    this.validateOwnership(idea, user)
    return idea;
  }

  async update(id: number, updateIdeaDto: UpdateIdeaDto, user: ActiveUserInterface) {
    await this.findOne( id, user );

    return await this.ideasRepository.update(id, {
      ...updateIdeaDto,
      category: updateIdeaDto.category ? await this.validateCategory(updateIdeaDto.category) : undefined,
      userEmail: user.email,
    });    
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne( id, user );
    return await this.ideasRepository.softDelete({ id });
  }

  private validateOwnership(idea: Idea, user: ActiveUserInterface) {
    //user.role !== Role.ADMIN &&
    if (idea.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateCategory(category: string) {
    const categoryEntity = await this.categoriesRepository.findOneBy({ title: category });
  
    if (!categoryEntity) {
      throw new BadRequestException('Category not found');
    }
    return categoryEntity;
  }
}
