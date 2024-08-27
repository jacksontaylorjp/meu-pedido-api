import { IsNotEmpty } from "class-validator";

export class CreatePedidoDto {
    @IsNotEmpty({message: "Campo obrigatório"})
    usuarioId: number;
    
    @IsNotEmpty({message: "Campo obrigatório"})
    data: Date;
    
    @IsNotEmpty({message: "Campo obrigatório"})
    status: boolean;
}
