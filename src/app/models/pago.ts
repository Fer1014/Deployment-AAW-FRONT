import { Tarjeta } from "./tarjeta"
import { Proyectos } from "./proyecto"

export class Pago {
    idPago:number=0
    monto:number=0
    fecha: Date = new Date(Date.now())
    tarjeta:Tarjeta=new Tarjeta()
    proyectos:Proyectos=new Proyectos();
}