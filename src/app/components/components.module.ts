import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosListarComponent } from './usuarios/usuarios-listar/usuarios-listar.component';
import { UsuariosCreaeditaComponent } from './usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { TipousuarioListarComponent } from './tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { TipousuarioCreaeditaComponent } from './tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TarjetaListarComponent } from './tarjeta/tarjeta-listar/tarjeta-listar.component';
import { TarjetaCreaeditaComponent } from './tarjeta/tarjeta-creaedita/tarjeta-creaedita.component';

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
import { ListarCarreraComponent } from './carrera/listar-carrera/listar-carrera.component';
import { ListarCurriculumComponent } from './curriculum/listar-curriculum/listar-curriculum.component';
import { ListarFormacionacademicaComponent } from './formacionacademica/listar-formacionacademica/listar-formacionacademica.component';
import { ListarUniversidadComponent } from './universidad/listar-universidad/listar-universidad.component';

import { PagoComponent } from './pago/pago.component';
import { ListarComponent } from './pago/listar/listar.component';
import { CrearComponent } from './pago/crear/crear.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { DesarrolladorComponent } from './desarrollador/desarrollador.component';
import { EmpresarioComponent } from './empresario/empresario.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { CantidadProyectosDesarrolladorComponent } from './reporte/cantidad-proyectos-desarrollador/cantidad-proyectos-desarrollador.component';
import { ComentarioPuntuacionComponent } from './comentario-puntuacion/comentario-puntuacion.component';
import { AddComentarioComponent } from './comentario-puntuacion/add/add.component';
import { ListarComentarioComponent } from './comentario-puntuacion/listar/listar.component';
import { ProfileDesarrolladorComponent } from './desarrollador/profile-desarrollador/profile-desarrollador.component';
import { ProfileEmpresarioComponent } from './empresario/profile-empresario/profile-empresario.component';
import { Reporte4Component } from './reporte/reporte4/reporte4.component';
import { DashboardComponent } from './administrador/dashboard/dashboard.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteCountUsuarioRolComponent } from './reporte/reporte-count-usuario-rol/reporte-count-usuario-rol.component';
import { NgChartsModule } from 'ng2-charts';
import { TolalusersconcvComponent } from './reporte/tolalusersconcv/tolalusersconcv.component';
import { CantidadUniversidadesComponent } from './reporte/cantidad-universidades/cantidad-universidades.component';






export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosListarComponent,
    UsuariosCreaeditaComponent,
    TipoUsuarioComponent,
    TipousuarioListarComponent,
    TipousuarioCreaeditaComponent,
    TarjetaComponent,
    TarjetaListarComponent,
    TarjetaCreaeditaComponent,
    PagoComponent,
    ListarComponent,
    CrearComponent,
    ProyectoComponent,
    ListarProyectoComponent,
    CrearProyectoComponent,
    DesarrolladorComponent,
    EmpresarioComponent,
    AdministradorComponent,
    ProfileDesarrolladorComponent,
    ProfileEmpresarioComponent,
    DashboardComponent,
    HomeComponent,
    UniversidadComponent,
    CreaeditaUniversidadComponent,
    CreaeditaCarreraComponent,
    CarreraComponent,
    FormacionacademicaComponent,
    CreaeditaFormacionacademicaComponent,
    CurriculumComponent,
    CreaeditaCurriculumComponent,
    CertificacionComponent,
    InsertEditCertificacionComponent,
    ListCertificacionComponent,
    ExperienciaLaboralComponent,
    InsertEditExperienciaLaboralComponent,
    ListExperienciaLaboralComponent,
    IdiomaComponent,
    InsertEditIdiomasComponent,
    ListIdiomasComponent,
    ListarCarreraComponent,
    ListarCurriculumComponent,
    ListarFormacionacademicaComponent,
    ListarUniversidadComponent,
    ReporteComponent,
    ReporteCountUsuarioRolComponent,
    CantidadProyectosDesarrolladorComponent,
    ComentarioPuntuacionComponent,
    AddComentarioComponent,
    ListarComentarioComponent,
    Reporte4Component,
    TolalusersconcvComponent,
    CantidadUniversidadesComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatTableModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSidenavModule,
    TranslateModule,
    MatGridListModule,
    NgChartsModule,

    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class ComponentsModule { }
