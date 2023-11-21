import { Certificaciones } from "./certificacion";
import { ExperienciaLaboral } from "./experiencia_laboral";
import { FormacionAcademica } from "./formacionacademica";
import { idioma } from "./idioma";
import { Usuarios } from "./usuarios";

export class CurriculumVitae{
    idCv:number=0;
    formacionAcademica:FormacionAcademica = new FormacionAcademica();
    idiomas: idioma = new idioma();
    certificaciones: Certificaciones = new Certificaciones();
    experiencialaboral: ExperienciaLaboral = new ExperienciaLaboral();
    users: Usuarios = new Usuarios();

}