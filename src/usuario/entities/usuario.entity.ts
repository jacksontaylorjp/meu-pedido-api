import { CreateUsuarioDto } from "../dto/create-usuario.dto";

export class Usuario {
    nome: string;
    email: string;
    matricula: string;
    cpf: string;
    senha: string;
    constructor(dto: CreateUsuarioDto) {
        this.nome = dto.nome;
        this.matricula = dto.matricula;
        this.email = dto.email;
        this.cpf = dto.cpf;
        this.senha = dto.senha;
    }
}
