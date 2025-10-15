import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { AboutComponent } from './components/about/about.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerGuard } from './guards/guards/customer.guard';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { AddProductComponent } from './components/addproduct/addproduct.component';
import { LoginComponent } from './components/login/login/login.component';
import { SellerGuard } from './guards/guards/seller.guard';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SellerNavComponent } from './components/seller-nav/seller-nav.component';
import { ShowProductsComponent } from './components/showproduct/showproduct.component';
import { CustomerOrdersComponent } from './components/customer-order/customer-order.component';
import { PublicGuard } from './guards/public.guard';
import { SellerOrdersComponent } from './components/seller-order/seller-order.component';
import { ToastComponent } from './components/ReusebleComponent/toast/toast.component';
import { DetailsComponent } from './components/details/details.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { CartComponent } from './components/cart/cart.component';
import { NavComponent } from './components/nav/nav.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [PublicGuard] },
    { path: 'home', component: HomeComponent, canActivate: [PublicGuard] },
    { path: 'about', component: AboutComponent, canActivate: [PublicGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [PublicGuard] },
    {path:'nav',component:NavComponent},

    { path: 'customerregister', component: CustomerRegisterComponent, canActivate: [PublicGuard] },
    { path: 'sellerregister', component: SellerRegisterComponent, canActivate: [PublicGuard] },
    { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },

    { path: 'main', component: MainPageComponent, canActivate: [CustomerGuard] },
    { path: 'customer-profile', component: CustomerProfileComponent, canActivate: [CustomerGuard] },
    { path: 'customer-order', component: CustomerOrdersComponent, canActivate: [CustomerGuard] },
    { path: 'details/:id', component: DetailsComponent, canActivate: [CustomerGuard] },
    { path: 'order/:id', component: OrderProductComponent, canActivate: [CustomerGuard] },
     { path: 'cart', component: CartComponent, canActivate: [CustomerGuard] },

    { path: 'seller-profile', component: SellerProfileComponent, canActivate: [SellerGuard] },
    { path: 'addproduct', component: AddProductComponent, canActivate: [SellerGuard] },
    { path: 'seller-dashboard', component: SellerDashboardComponent, canActivate: [SellerGuard] },
    { path: 'seller-order', component: SellerOrdersComponent, canActivate: [SellerGuard] },
    { path: 'showproduct', component: ShowProductsComponent },
    { path: 'seller-nav', component: SellerNavComponent, canActivate: [SellerGuard] },
    { path: 'toast', component: ToastComponent },
    { path: '**', redirectTo: 'home' }


];


