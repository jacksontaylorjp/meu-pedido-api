import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "@nestjs/class-validator";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsNotEmpty({message: 'O nome não pode ficar vazio.'})
    @IsOptional()
    nome: string;
    
    @IsEmail()
    @IsOptional()
    email: string;

    @MinLength(6, {message:'A senha precisar ter no mínimo 6 digitos.'})
    @IsOptional()
    senha: string;
}
