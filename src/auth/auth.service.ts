import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService){}

    async signIn(usuarioEmail: string, usuarioSenha: string): Promise<any>{
        const usuario = await this.usuarioService.findByEmail(usuarioEmail);
        if(usuario.senha !== usuarioSenha){
            throw new UnauthorizedException();
        }
        const {senha, ...rest} = usuario;
        return rest;
    }
    
}
