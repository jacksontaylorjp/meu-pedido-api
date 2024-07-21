import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const hashedSenha = await bcrypt.hash(data.senha, 10);
    return this.prisma.usuario.create({ data:{
      ...data, senha: hashedSenha
    } });
  }

  findAll() {
    const res =  this.prisma.usuario.findMany();
    return res;
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  // findByEmail(email: string) {
  //   return this.prisma.usuario.findUnique({
  //     where: {
  //       email: String(email),
  //     },
  //   });
  // }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: updateUsuarioDto
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
      return false;
    }
    return bcrypt.compare(senha, usuario.senha);
  }
}
