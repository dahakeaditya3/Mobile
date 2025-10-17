import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { HomeComponent } from "../home/home.component";
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FooterComponent, SellerNavComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  products: IProduct[] = [];
  displayedProducts: IProduct[] = [];
  showAll: boolean = false;

  stats = [
    { value: '10 + ', label: 'Years Experience' },
    { value: '99 Cr +', label: 'Users' },
    { value: '50000 +', label: 'Positive Reviews' },
    { value: '600 +', label: 'Trusted Partners' }
  ];

  sellerId!: number;

  constructor(private productService: ProductService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    const sellerId = Number(localStorage.getItem('userId'));
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.displayedProducts = this.products.slice(0, 12);
    });
  }


  pressButton() {
    this.toastService.show('Sign up as Customer!', 'warning');
  }

  loadMore() {
    this.displayedProducts = this.products;
    this.showAll = true;
  }
}

