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

  findAll() {
    return `This action returns all pedido`;
  }

  findByData(data: string) {
    return this.prisma.pedido.findFirst({
      where: {
        data: data,
      },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
