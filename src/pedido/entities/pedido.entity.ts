import { CreatePedidoDto } from "../dto/create-pedido.dto";

export class Pedido {
    id: number;
    usuarioId: number;
    data: Date;
    status: boolean;

    constructor(dto: CreatePedidoDto) {
        this.usuarioId = dto.usuarioId;
        this.data = dto.data;
        this.status = dto.status;
    }
}
