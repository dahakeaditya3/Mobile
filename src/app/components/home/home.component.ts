import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { SellerNavComponent } from "../seller-nav/seller-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent, SellerNavComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  displayedProducts: IProduct[] = [];
  showAll: boolean = false;

  stats = [
    { value: '10 + ', label: 'Years Experience' },
    { value: '99 Cr +', label: 'Users' },
    { value: '50000 +', label: 'Positive Reviews' },
    { value: '600 +', label: 'Trusted Partners' }
  ];

  sellerId!:number;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
     const sellerId = Number(localStorage.getItem('userId'));
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.displayedProducts = this.products.slice(0, 12); // Show first 12 by default
    });
  }


  pressButton() {
    this.router.navigateByUrl('/login');
  }

  loadMore() {
    this.displayedProducts = this.products;
    this.showAll = true;
  }
  
}
