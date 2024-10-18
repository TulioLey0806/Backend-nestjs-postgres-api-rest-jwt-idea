import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Role } from '../common/enums/role.enum';
import { Auth } from '../auth/decorators/auth.decorators';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorizer Bearer Auth'})
@Auth(Role.USER)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({description: 'Forbidden.'})
  create(@Body() createCommentDto: CreateCommentDto, @ActiveUser() user: ActiveUserInterface) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.commentsService.findOne(id, user), user;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @ActiveUser() user: ActiveUserInterface) {
    return this.commentsService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.commentsService.remove(id, user);
  }
}
