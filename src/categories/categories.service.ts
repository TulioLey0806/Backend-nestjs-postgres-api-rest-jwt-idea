import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
 
 async create(createCategoryDto: CreateCategoryDto) {
  const category = this.categoriesRepository.create(createCategoryDto);
  return await this.categoriesRepository.save(category);
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

     // Aplicar los cambios de updateCategoryDto a category
     Object.assign(category, updateCategoryDto);

    return await this.categoriesRepository.save(category);  
  }

  async remove(id: number) {
    return await this.categoriesRepository.softDelete(id);
  }
}
