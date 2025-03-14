import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class PokemonCheckoutComponent implements OnInit {
  currentDate = new Date();
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  subtotal: number = 0;
  shipping: number = 5.99;
  tax: number = 0;
  total: number = 0;
  
  checkoutForm: FormGroup;
  orderPlaced: boolean = false;
  orderId: string = '';
  
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      shippingInfo: this.fb.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      paymentInfo: this.fb.group({
        cardName: ['', [Validators.required]],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
      })
    });
  }
  
  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateCartTotals();
    
    // Pre-fill form with user data if available
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (user && user.email) {
      this.checkoutForm.patchValue({
        shippingInfo: {
          fullName: user.name || '',
          email: user.email || ''
        }
      });
    }
  }
  
  calculateCartTotals(): void {
    this.totalItems = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.14;
    this.total = this.subtotal + this.shipping + this.tax;
  }
  
  placeOrder(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      // Generate a simple order ID
      this.orderId = 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      // hena b Create order object
      const order = {
        orderId: this.orderId,
        cart: this.cartItems,
        totalItems: this.totalItems,
        subtotal: this.subtotal,
        shipping: this.shipping,
        tax: this.tax,
        total: this.total,
        status: 'Placed',
        date: new Date(),
        shippingInfo: this.checkoutForm.get('shippingInfo')?.value,
        paymentInfo: {
          // b5zn a5r 4 arqam mel card number
          cardType: 'Credit Card',
          cardLast4: this.checkoutForm.get('paymentInfo.cardNumber')?.value.slice(-4)
        }
      };
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      // Get current user from local storage
      let user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      
      // Initialize orders array if it doesn't exist
      if (!user.orders) {
        user.orders = [];
      }
      
      // bndef el order el gdeda lel orders array
      user.orders.push(order);
      
      // save the updated user object to local storageSS
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      let updatedUsers = users.map((u: any) =>
        u.email === user.email ? user : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear the cart
      this.cartService.clearCart();
      localStorage.removeItem('cart');
      
      // Set order placed flag to true to show confirmation
      this.orderPlaced = true;
    }
  }
  
  returnToShop(): void {
    this.router.navigate(['/pokemon']);
  }
  
  viewOrderHistory(): void {
    this.router.navigate(['/profile']);
  }
}