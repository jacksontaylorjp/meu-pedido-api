import { IsEmail, IsNotEmpty, MinLength } from "@nestjs/class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty({message: 'O nome não pode ficar vazio.'})
    nome: string;
    
    @IsNotEmpty({message: 'a matricula não pode ficar vazia.'})
    matricula: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'a cpf não pode ficar vazia.'})
    cpf: string;

    @MinLength(6, {message:'A senha precisar ter no mínimo 6 digitos.'})
    senha: string;
}
