import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  imports: [UsuarioModule, PrismaModule],
  controllers: [PedidoController],
  providers: [PedidoService, UsuarioService],
})
export class PedidoModule {}
