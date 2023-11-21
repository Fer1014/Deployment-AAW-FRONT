import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './usuarios/usuarios-listar/usuarios-listar.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { TipousuarioCreaeditaComponent } from './tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TipousuarioListarComponent } from './tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TarjetaCreaeditaComponent } from './tarjeta/tarjeta-creaedita/tarjeta-creaedita.component';
import { TarjetaListarComponent } from './tarjeta/tarjeta-listar/tarjeta-listar.component';


import { UniversidadComponent } from './universidad/universidad.component';
import { CreaeditaUniversidadComponent } from './universidad/creaedita-universidad/creaedita-universidad.component';
import { CreaeditaCarreraComponent } from './carrera/creaedita-carrera/creaedita-carrera.component';
import { CarreraComponent } from './carrera/carrera.component';
import { FormacionacademicaComponent } from './formacionacademica/formacionacademica.component';
import { CreaeditaFormacionacademicaComponent } from './formacionacademica/creaedita-formacionacademica/creaedita-formacionacademica.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CreaeditaCurriculumComponent } from './curriculum/creaedita-curriculum/creaedita-curriculum.component';
import { CertificacionComponent } from './certificacion/certificacion.component';
import { InsertEditCertificacionComponent } from './certificacion/insert-edit-certificacion/insert-edit-certificacion.component';
import { ListCertificacionComponent } from './certificacion/list-certificacion/list-certificacion.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { InsertEditExperienciaLaboralComponent } from './experiencia-laboral/insert-edit-experiencia-laboral/insert-edit-experiencia-laboral.component';
import { ListExperienciaLaboralComponent } from './experiencia-laboral/list-experiencia-laboral/list-experiencia-laboral.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { InsertEditIdiomasComponent } from './idioma/insert-edit-idiomas/insert-edit-idiomas.component';
import { ListIdiomasComponent } from './idioma/list-idiomas/list-idiomas.component';




import { PagoComponent } from './pago/pago.component';
import { CrearComponent } from './pago/crear/crear.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EmpresarioComponent } from './empresario/empresario.component';
import { DesarrolladorComponent } from './desarrollador/desarrollador.component';
import { GuardService } from '../services/guard.service';
import { ProfileEmpresarioComponent } from './empresario/profile-empresario/profile-empresario.component';
import { ProfileDesarrolladorComponent } from './desarrollador/profile-desarrollador/profile-desarrollador.component';
import { DashboardComponent } from './administrador/dashboard/dashboard.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';
import { ListarCurriculumComponent } from './curriculum/listar-curriculum/listar-curriculum.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteCountUsuarioRolComponent } from './reporte/reporte-count-usuario-rol/reporte-count-usuario-rol.component';
import { CantidadProyectosDesarrolladorComponent } from './reporte/cantidad-proyectos-desarrollador/cantidad-proyectos-desarrollador.component';
import { ComentarioPuntuacionComponent } from './comentario-puntuacion/comentario-puntuacion.component';
import { ListarComentarioComponent } from './comentario-puntuacion/listar/listar.component';
import { AddComentarioComponent } from './comentario-puntuacion/add/add.component';
import { Reporte4Component } from './reporte/reporte4/reporte4.component';
import { TolalusersconcvComponent } from './reporte/tolalusersconcv/tolalusersconcv.component';
import { CantidadUniversidadesComponent } from './reporte/cantidad-universidades/cantidad-universidades.component';



const routes: Routes = [
  {
    canActivate: [GuardService],
    path:'administrador/:id',
    component: AdministradorComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent,
      },
      {
        path:'usuarios',
        component: UsuariosComponent,
        children:[
          {path: 'nuevo', component: UsuariosCreaeditaComponent},
          {path: 'ediciones/:id', component: UsuariosCreaeditaComponent}
        ]
      },
      {
        path: 'comentarios', component: ComentarioPuntuacionComponent, children: [
          { path: 'listar', component: ListarComentarioComponent },
          { path: 'add', component: AddComentarioComponent },
        ]
      },
      {
        path:'reporte',
        component:ReporteComponent,
        children:[
          {path:'reporteFernando', component: ReporteCountUsuarioRolComponent},
          {path:'reporteJhonatan', component: CantidadProyectosDesarrolladorComponent},
          {path:'reportePatrick', component: Reporte4Component},
          {path:'reporteCarlos', component: TolalusersconcvComponent},
          {path: 'reporteGeyler', component: CantidadUniversidadesComponent},
        ]
      },
      {
        path: 'tipousuario', component: TipoUsuarioComponent, children: [
          { path: 'nuevo', component: TipousuarioCreaeditaComponent },
          { path: 'ediciones/:id', component: TipousuarioCreaeditaComponent}
        ]
      },
      {
        path: 'proyectos', component: ProyectoComponent, children: [
          { path: 'nuevo', component: CrearProyectoComponent },
          { path: 'ediciones/:id', component: CrearProyectoComponent}
        ]
      },
      {
        path: 'tarjetas', component: TarjetaComponent, children: [
          {path: 'nuevo', component: TarjetaCreaeditaComponent},
          {path: 'ediciones/:id',component: TarjetaCreaeditaComponent}
        ]
      },
      {
        path: 'curriculum', component:CurriculumComponent, children: [
          {path: 'nuevo', component: CreaeditaCurriculumComponent},
          {path: 'ediciones/:id', component: CreaeditaCurriculumComponent}
        ]
      },
      {
        path: 'universidades',
        component: UniversidadComponent,
        children: [
          { path: 'nuevo', component: CreaeditaUniversidadComponent },
          { path: 'ediciones/:id', component: CreaeditaUniversidadComponent },
        ],
      },
      {
        path: 'carreras',
        component: CarreraComponent,
        children: [
          { path: 'nuevo', component: CreaeditaCarreraComponent },
          { path: 'ediciones/:id', component: CreaeditaCarreraComponent },
        ],
      },
    ]
  },
  {

    canActivate: [GuardService],
    path:'desarrollador/:id',
    component: DesarrolladorComponent,
    children: [
      {
        path: 'profiled',
        component: ProfileDesarrolladorComponent,

      },
      {
        path: 'universidad',
        component: UniversidadComponent,
        children: [
          { path: 'nuevo', component: CreaeditaUniversidadComponent },
          { path: 'ediciones/:id', component: CreaeditaUniversidadComponent },
        ],
      },
      {
        path: 'carrera',
        component: CarreraComponent,
        children: [
          { path: 'nuevo', component: CreaeditaCarreraComponent },
          { path: 'ediciones/:id', component: CreaeditaCarreraComponent },
        ],
      },
      {
        path: 'experiencia-laboral',
        component: ExperienciaLaboralComponent,
        children: [
          { path: 'nuevo', component: InsertEditExperienciaLaboralComponent },
          { path: 'ediciones/:id', component: InsertEditExperienciaLaboralComponent },
        ],
      }, 
      {
        path: 'formacionacademica',
        component: FormacionacademicaComponent,
        children: [
          { path: 'nuevo', component: CreaeditaFormacionacademicaComponent },
          { path: 'ediciones/:id', component: CreaeditaFormacionacademicaComponent },
        ],
      },
      {
        path:'certificacion',
        component: CertificacionComponent,
        children: [
          {path: 'nuevo', component: InsertEditCertificacionComponent},
          {path: 'ediciones/:id', component: InsertEditCertificacionComponent},
        ]
      },
      {
        path:'idioma',
        component:IdiomaComponent,
        children: [
          {path: 'nuevo', component: InsertEditIdiomasComponent},
          {path: 'ediciones/:id', component: InsertEditIdiomasComponent},
        ]
      },
      {
        path:'curriculum',
        component:CurriculumComponent,
        children: [
          {path: 'nuevo', component: CreaeditaCurriculumComponent},
          {path: 'listar', component: ListarCurriculumComponent},
          {path: 'ediciones/:id', component: CreaeditaCurriculumComponent}
        ]
      },
      {
        path:'tarjeta',
        component:TarjetaComponent,
        children: [
          {path:'nuevo', component: TarjetaCreaeditaComponent},
          {path:'ediciones/:id', component: TarjetaCreaeditaComponent}
        ]
      }


    ]
  },
  {

    canActivate: [GuardService],
    path:'empresario/:id',
    component: EmpresarioComponent,
    children: [
      {
        path: 'profilee',
        component: ProfileEmpresarioComponent,
      },
      {
        path: 'proyecto',
        component: ProyectoComponent,
        children: [
          {path: 'nuevo', component: CrearProyectoComponent},
          {path: 'listar', component: ListarProyectoComponent},
          {path: 'ediciones/:id', component: CrearProyectoComponent},
        ]
      },
      {
        path: 'pagos',
        component: PagoComponent,
        children: [
          {path: 'nuevo', component: CrearComponent},
          {path: 'ediciones/;id', component: CrearComponent},
        ]
      },
      {
        path:'usuarios',
        component: UsuariosComponent
      }
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
