import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId },
    });
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: { answers: true, user: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.questions.findUnique({
      where: { id },
      include: { answers: true, user: true },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.questions.delete({ where: { id } });
  }
}
