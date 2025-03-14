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
  currentUser: any = null;
  orders: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    );

    if (this.currentUser && this.currentUser.orders) {
      this.orders = this.currentUser.orders;
    }
  }


  getGenderImage(): string {
    return this.currentUser.gender === 'Male'
      ? 'male.jpg'
      : 'female.jpg';
  }
}
