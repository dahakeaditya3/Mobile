import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { IProduct } from '../../models/interface/products.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  showAll: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleView() {
    this.showAll = !this.showAll;
  }
}
