import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'customerprofile', component: UserProfileComponent },
    { path: 'sellerprofile', component: SellerProfileComponent },
    { path: 'seller-register', component: SellerRegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
