import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.create({ data });
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
}
