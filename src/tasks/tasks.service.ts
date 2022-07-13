import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { DeleteTaskByIdDTO } from './dto/delete-task-by-id.dto';
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  async getAllTasks(): Promise<Tasks[]> {
    const found = await this.tasksRepository.findBy({});
    return found;
  }

  async getTaskById(id: string): Promise<Tasks> {
    const found = await this.tasksRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException('Task with id:"${id}" does not exist:');
    }
    return found;
  }
  // getTaskById(@Param('id') id: string): Tasks {
  //   return this.tasksService.getTaskById(id);
  // }
  //   if (!found) {
  //     throw new NotFoundException();
  //   }
  //   return found;
  // }

  async updateTaskDescription(
    id: string,
    descriptionDto: CreateTaskDTO,
  ): Promise<Tasks> {
    const found = await this.getTaskById(id);
    found.description = descriptionDto.description;
    await this.tasksRepository.save(found);
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Tasks> {
    const newTask = this.tasksRepository.create({
      description: createTaskDTO.description,
    });
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async deleteTaskById(id: string): Promise<Tasks> {
    const found = this.getTaskById(id);
    if (!found) {
      return;
    } else {
      await this.tasksRepository.delete(id);
      return found;
    }
  }
}
