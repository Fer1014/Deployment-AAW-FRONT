import { Usuarios } from "./usuarios"

export class Comentario{
  idComentario:number=0
  comentario:string= ""
  users:Usuarios=new Usuarios()
  usersR:Usuarios=new Usuarios()
  puntuacion:number=0
}