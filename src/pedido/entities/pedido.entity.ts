import { Usuario } from "@prisma/client";

export class Pedido {
    data: Date;
    usuario: Usuario;
}
