import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePedidoDto) {
    try {
      const response = await this.prisma.pedido.create({ data: data });
      return response;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException("pedido já cadastrado");
      }
      throw error;
    }
  }

  async findAllPerUser(usuarioId: number) {
    try {
      return await this.prisma.pedido.findMany({
        where: {
          usuarioId: Number(usuarioId),
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  async findByData(dados: any) {
    const { usuarioId, data } = dados;    
    try {
      return await this.prisma.pedido.findFirst({
        where: {
          usuarioId: usuarioId,
          data: data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async update(updatePedidoDto: UpdatePedidoDto) {
    const { id, status } = updatePedidoDto;
    try {
      return await this.prisma.pedido.update({
        where: { id },
        data: { status }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("pedido não existe");
      }
      throw error;
    }
  }
}
