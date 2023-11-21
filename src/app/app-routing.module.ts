import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './components/usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { TipousuarioCreaeditaComponent } from './components/tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TipousuarioListarComponent } from './components/tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { TarjetaCreaeditaComponent } from './components/tarjeta/tarjeta-creaedita/tarjeta-creaedita.component';
import { TarjetaListarComponent } from './components/tarjeta/tarjeta-listar/tarjeta-listar.component';
import { UniversidadComponent } from './components/universidad/universidad.component';
import { CreaeditaUniversidadComponent } from './components/universidad/creaedita-universidad/creaedita-universidad.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { CreaeditaCarreraComponent } from './components/carrera/creaedita-carrera/creaedita-carrera.component';
import { FormacionacademicaComponent } from './components/formacionacademica/formacionacademica.component';
import { CreaeditaFormacionacademicaComponent } from './components/formacionacademica/creaedita-formacionacademica/creaedita-formacionacademica.component';
import { PagoComponent } from './components/pago/pago.component';
import { CrearComponent } from './components/pago/crear/crear.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { CrearProyectoComponent } from './components/proyecto/crear-proyecto/crear-proyecto.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { CreaeditaCurriculumComponent } from './components/curriculum/creaedita-curriculum/creaedita-curriculum.component';
import { CertificacionComponent } from './components/certificacion/certificacion.component';
import { InsertEditCertificacionComponent } from './components/certificacion/insert-edit-certificacion/insert-edit-certificacion.component';
import { InsertEditIdiomasComponent } from './components/idioma/insert-edit-idiomas/insert-edit-idiomas.component';
import { IdiomaComponent } from './components/idioma/idioma.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },*/
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'usuarios',
    component: UsuariosComponent,
    children: [
      {path: 'nuevo',component:UsuariosCreaeditaComponent}

    ]
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
