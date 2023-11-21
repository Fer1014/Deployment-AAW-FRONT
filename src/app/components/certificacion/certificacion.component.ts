import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificacion',
  templateUrl: './certificacion.component.html',
  styleUrls: ['./certificacion.component.css']
})
export class CertificacionComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
