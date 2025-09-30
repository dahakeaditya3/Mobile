import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FooterComponent, SellerNavComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  products: IProduct[] = [];
  showAll: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  toggleView() {
    this.showAll = !this.showAll;
  }
}
