import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Ideas')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorizer Bearer Auth'})
@Auth(Role.USER)
@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({description: 'Forbidden.'})
  create(@Body() createIdeaDto: CreateIdeaDto, @ActiveUser() user: ActiveUserInterface) {
    return this.ideasService.create(createIdeaDto, user);
  }

  @Get()
  findAll() {
    return this.ideasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.ideasService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateIdeaDto: UpdateIdeaDto, @ActiveUser() user: ActiveUserInterface) {
    return this.ideasService.update(id, updateIdeaDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.ideasService.remove(id, user);
  }
}
