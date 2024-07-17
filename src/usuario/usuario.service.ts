import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService){}

  async create(usuario: Usuario): Promise<User> {
    return this.prisma.usuario.create(usuario);
  }

  // findAll() {
  //   return this.usuarios;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
