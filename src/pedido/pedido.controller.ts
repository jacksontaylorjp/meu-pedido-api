import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Pedido } from './entities/pedido.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('/pedido')
export class PedidoController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly usuarioService: UsuarioService
  ) { }

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
  async relatorioDia(
    @Query('data') data: string
  ) {
    const response = await this.pedidoService.relatorioDia(data);
    const relatorio = await Promise.all(response.map(async (res) => await this.usuarioService.findOne(res.usuarioId)));
    const relatorioFinal = relatorio.map(({ senha, email, id, ...dados }) => dados);
    return relatorioFinal;
  }
}
