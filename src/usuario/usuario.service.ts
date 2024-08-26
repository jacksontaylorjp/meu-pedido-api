import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    try {
      const hashedSenha = await bcrypt.hash(data.senha, 10);
      const response = await this.prisma.usuario.create({
        data: {
          ...data,
          senha: hashedSenha,
        },
      });
      return response;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('CPF já está em uso');
      }
      throw error; 
    }
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: updateUsuarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async verifyPassword(email: string, senha: string): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) {
      console.log('Usuário não encontrado');
      return false;
    }
    return bcrypt.compare(senha, usuario.senha);
  }
}
