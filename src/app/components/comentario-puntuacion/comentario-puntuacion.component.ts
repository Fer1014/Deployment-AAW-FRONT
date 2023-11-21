import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comentario-puntuacion',
  templateUrl: './comentario-puntuacion.component.html',
  styleUrls: ['./comentario-puntuacion.component.css']
})
export class ComentarioPuntuacionComponent {

  constructor(public route: ActivatedRoute) {}

}
