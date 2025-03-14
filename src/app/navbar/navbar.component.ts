import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){}
  activeTab: string = 'home'; 

  setActive(tab: string) {
    this.activeTab = tab;
  }
  signOut(){
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log(users)
    // console.log(cart)
    // console.log(loggedInUser)
    if (loggedInUser) {
      let userIndex = users.findIndex((user: any) => user.email === loggedInUser.email);
      if (userIndex !== -1) {
        users[userIndex].orders.push(cart);
        // save Updates
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
    // localStorage.removeItem('cart');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['login']);
  }
}
