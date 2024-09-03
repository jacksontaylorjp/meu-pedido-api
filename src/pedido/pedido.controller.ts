import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Pedido } from './entities/pedido.entity';

@Controller('/pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedidoEntity = new Pedido(createPedidoDto);
    return this.pedidoService.create(pedidoEntity as CreatePedidoDto);
  }

  @UseGuards(AuthGuard)
  @Get('user/:usuarioId')
  findAllPerUser(@Param('usuarioId') usuarioId: number) {
    return this.pedidoService.findAllPerUser(usuarioId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findByData(
    @Query('usuarioId') usuarioId: number,
    @Query('data') data: string
  ) {
    return this.pedidoService.findByData({ usuarioId, data });
  }
  
  @UseGuards(AuthGuard)
  @Patch()
  update(@Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(updatePedidoDto);
  }

  @UseGuards(AuthGuard)
  @Get('/relatorio')
  relatorioDia(
    @Query('data') data: string
  ){
    return this.pedidoService.relatorioDia(data);
  }
}
