import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from './dto/create-task.dto';
import { DeleteTaskByIdDTO } from './dto/delete-task-by-id.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(): void {
  //   // return this.tasksService.getAllTasks();
  //   console.log('api hit');
  // }

  @Get()
  async getAllTasks(): Promise<Tasks[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch('/:id/description')
  updateTaskDescription(
    @Param('id') id: string,
    //using the same DTO for update task and create task because the data contaiend is exactly the same in them
    @Body() descriptionDto: CreateTaskDTO,
  ): Promise<Tasks> {
    return this.tasksService.updateTaskDescription(id, descriptionDto);
  }

  @Delete()
  deleteTaskById(@Body() deleteTaskByIdDto: DeleteTaskByIdDTO): Promise<Tasks> {
    return this.tasksService.deleteTaskById(deleteTaskByIdDto.id);
  }
}
