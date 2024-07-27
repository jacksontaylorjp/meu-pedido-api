import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [UsuarioModule, PrismaModule, AuthModule, PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
