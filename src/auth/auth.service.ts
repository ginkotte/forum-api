import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;

  async signin(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(params.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
