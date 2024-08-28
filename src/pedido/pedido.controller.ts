import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Pedido } from './entities/pedido.entity';

@Controller('/pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedidoEntity = new Pedido(createPedidoDto);
    return this.pedidoService.create(pedidoEntity as CreatePedidoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':data')
  findOne(@Param('data') data: string) {
    return this.pedidoService.findByData(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }
}
