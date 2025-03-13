import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.services';

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }


  getGenderImage(): string {
    return this.currentUser.gender === 'Male'
      ? 'assets/male.jpg'
      : 'assets/female.jpg';
  }
}
