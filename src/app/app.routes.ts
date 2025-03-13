import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonCartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayOutComponent } from './layout/auth-lay-out/auth-lay-out.component';
import { HomeLayOutComponent } from './layout/home-lay-out/home-lay-out.component';
import { NotFoundComponent } from './components/NotFoundComponent/not-found.component';

export const routes: Routes = [
  {path:"", component:AuthLayOutComponent,children:[
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]}
  ,
  {path:"", component:HomeLayOutComponent,children:[
    { path: 'pokemon', component: HomeComponent, pathMatch: 'full' },
    { path: 'cart', component: PokemonCartComponent },
    { path: 'about', component: AboutComponent },
    { path: 'pokemon/:id', component: PokemonDetailsComponent } // Dynamic route
  ]},
  { path: '**', component:NotFoundComponent }
 
];
