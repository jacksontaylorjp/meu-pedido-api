import { IsEmail, IsNotEmpty, MinLength } from "@nestjs/class-validator";

export class SignInAuthDto {    
    @IsEmail()
    email: string;

    @MinLength(6, {message:'A senha precisar ter no mínimo 6 digitos.'})
    senha: string;
}
