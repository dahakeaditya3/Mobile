import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { OrderComponent } from './components/order/order/order.component';
import { FooterComponent } from './components/footer/footer.component';
import { SellerOrdersComponent } from './components/seller-orders/seller-orders.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'seller-register', component: SellerRegisterComponent },
    { path: 'dashboard', component: MainPageComponent },
    //   { path: '/order/:id', component: OrderComponent },
    { path: 'customerprofile', component: UserProfileComponent },
    { path: 'sellerprofile', component: SellerProfileComponent },
    { path: 'sellerorder', component: SellerOrdersComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
