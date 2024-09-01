import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    @IsNotEmpty()
    id: number;

    @IsOptional()
    data: Date;
}
