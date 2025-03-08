import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';

  getCart(): any[] {
    //lazem empty array 3ashan law msh 3arfeen hatraga3 null wala eh
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  addToCart(card: any) {
    let cart = this.getCart();
    let existingItem = cart.find((c) => card.id === c.id);
    console.log(cart);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...card, quantity: 1 });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
}
