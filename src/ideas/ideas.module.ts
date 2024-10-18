import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Idea]), CategoriesModule, AuthModule],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [TypeOrmModule],
})
export class IdeasModule {}
