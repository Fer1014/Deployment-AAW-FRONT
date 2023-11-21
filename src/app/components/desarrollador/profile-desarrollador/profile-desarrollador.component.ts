import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-desarrollador',
  templateUrl: './profile-desarrollador.component.html',
  styleUrls: ['./profile-desarrollador.component.css']
})
export class ProfileDesarrolladorComponent {
  constructor(public route: ActivatedRoute) {}

}
