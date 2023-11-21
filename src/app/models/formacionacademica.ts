import { Carrera } from "./carrera"
import { Universidad } from "./universidad"

export class FormacionAcademica{
    idFormacionAcademica:number=0;
    nombreSecundaria:string="";
    university:Universidad=new Universidad();
    carreras:Carrera=new Carrera();
}