import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService){}

    async signIn(): Promise<any>{
        // const usuario = await this.usuarioService.findByEmail();
    }
}
