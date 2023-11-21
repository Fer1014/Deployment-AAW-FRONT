import { Component, OnInit, inject, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario-puntuacion';
import { CommentService } from 'src/app/services/comment.service';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { ComentarioPuntuacionComponent } from '../comentario-puntuacion.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { Usuarios } from 'src/app/models/usuarios';
@Component({
  selector: 'app-listar-comentariopuntuacion',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],

})
export class ListarComentarioComponent implements OnInit{

  //comentarios: Comentario[] = [];
  usuarioReceptor = Number(sessionStorage.getItem("idUsuarioComentario")?.toString());
  usuarioSesion = Number(sessionStorage.getItem("idUsuario")?.toString());


  usuarioPerfil: Usuarios = new Usuarios();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //obs: Observable<any>;

  obs: Observable<any> | undefined;
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource<Comentario>();
  
  
  constructor(private cS: CommentService, private breakpointObserver: BreakpointObserver, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.cS.listbyUser(this.usuarioReceptor).subscribe((data) =>{
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource<Comentario>(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();      
      //this.dataSource.paginator = this.paginator;
      //this.comentarios = data;
      //this.comentarios = this.comentarios;
    });
    /*this.cS.getList().subscribe((data) => {
       this.comentarios = data;
       this.comentarios = this.comentarios;

   });*/

  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  // Función para navegar al componente ComentarioPuntuacionComponent
  navigateToComentarioPuntuacion() {
    this.router.navigate(['components/administrador/dashboard/comentarios/add']);
  }

}
