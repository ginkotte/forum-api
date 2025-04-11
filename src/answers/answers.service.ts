import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(
    createAnswerDto: CreateAnswerDto,
    userId: string,
    questionId: string,
  ) {
    return await this.prisma.answers.create({
      data: { ...createAnswerDto, userId, questionId },
    });
  }

  async findAll() {
    return await this.prisma.answers.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.answers.findUnique({ where: { id } });
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return await this.prisma.answers.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.answers.delete({
      where: { id },
    });
  }
}
