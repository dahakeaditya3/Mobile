import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: IProduct[] = [];
  showAll: boolean = false;

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  pressButton()
  {
      this.router.navigateByUrl('/login');
  }

  toggleView() {
    this.showAll = !this.showAll;
  }
}
