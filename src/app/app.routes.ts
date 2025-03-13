import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonCartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/notFound/not-found.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pokemon', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart', component: PokemonCartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent }, // Dynamic route
  { path: '**', component: NotFoundComponent },
];
