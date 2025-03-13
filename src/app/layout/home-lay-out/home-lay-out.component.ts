import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-lay-out',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './home-lay-out.component.html',
  styleUrl: './home-lay-out.component.css'
})
export class HomeLayOutComponent {

}
