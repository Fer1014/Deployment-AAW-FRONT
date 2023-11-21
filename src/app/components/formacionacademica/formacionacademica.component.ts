import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formacionacademica',
  templateUrl: './formacionacademica.component.html',
  styleUrls: ['./formacionacademica.component.css']
})
export class FormacionacademicaComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
