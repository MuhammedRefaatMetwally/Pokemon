import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class PokemonCartComponent implements OnInit, OnDestroy {
  cartItems2: any = [];

  totalItems: number = 0;
  subtotal: number = 0;
  shipping: number = 5.99;
  tax: number = 0;
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cartItems2 = this.cartService.getCart();
    this.calculateCartTotals();

    console.log(this.cartItems2);
  }

  calculateCartTotals(): void {
    this.totalItems = this.cartItems2.reduce(
      (sum: any, item: any) => sum + item.quantity,
      0
    );
    this.subtotal = this.cartItems2.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.14;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.calculateCartTotals();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateCartTotals();
    }
  }

  removeItem(index: number): void {
    this.cartItems2.splice(index, 1);
    this.calculateCartTotals();
  }

  clearCart(): void {
    this.cartItems2 = [];
    this.calculateCartTotals();
  }
  ngOnDestroy(): void {
    // Save cart to local storage when component is destroyed
    localStorage.setItem('cart', JSON.stringify(this.cartItems2));
  }

checkout(): void {
  let currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  let newOrder = {
    cart: this.cartItems2,
    totalItems: this.totalItems,
    total: this.total,
    status: 'Placed',
    date: new Date(),
  };

  if (!currentUser.orders) {
    currentUser.orders = [];
  }

  currentUser.orders.push(newOrder);

  localStorage.setItem('loggedInUser', JSON.stringify(currentUser));

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let updatedUsers = users.map((user: any) =>
    user.email === currentUser.email ? currentUser : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  this.clearCart();

   this.router.navigate(['/checkout']);
}

}
