import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async signIn(email: string, senha: string): Promise<{ access_token: string }> {

        const res = await this.usuarioService.verifyPassword(email, senha);
        const usuario = await this.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }
        const payload = { sub: usuario.id, usuarioNome: usuario.nome }
        if (res) {
            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        } else {
            throw new UnauthorizedException('Usuário ou Senha incorreta');
        }
    }

}
