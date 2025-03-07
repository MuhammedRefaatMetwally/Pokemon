import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent,pathMatch:"full" },
    { path: 'cart', component: CartComponent },
    { path: 'about', component: AboutComponent },
    { path: 'pokemon/:id', component: PokemonDetailsComponent }, // Dynamic route

  ];