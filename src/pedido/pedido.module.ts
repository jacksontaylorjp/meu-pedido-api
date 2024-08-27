import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UsuarioModule, PrismaModule],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
