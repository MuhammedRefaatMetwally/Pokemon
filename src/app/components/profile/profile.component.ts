import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl:'./profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;
   purchasedItems: any[] = [];

  constructor(private cartService: CartService , private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  goHome(): void {
    this.router.navigate(['pokemon']);
  }


  getGenderImage(): string {
    return this.currentUser.gender === 'Male'
      ? 'male.jpg'
      : 'female.jpg';
  }
}
