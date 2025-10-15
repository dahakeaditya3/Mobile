import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { IProduct } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CustomerNavComponent } from "../../customer-nav/customer-nav.component";
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, CustomerNavComponent, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  paginatedProducts: IProduct[] = [];
  companies: string[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  selectedPriceOrder: string = '';
  selectedCompany: string = '';

  selectedProduct: IProduct | null = null;
  quantity: number = 1;
  totalPrice: number = 0;

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.companies = [...new Set(data.map(p => p.productCompany))];
        this.applyFilters();
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.selectedCompany) {
      result = result.filter(p => p.productCompany === this.selectedCompany);
    }

    if (this.selectedPriceOrder === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.selectedPriceOrder === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  onPriceFilterChange(event: any) {
    this.selectedPriceOrder = event.target.value;
    this.applyFilters();
  }

  onCompanyFilterChange(event: any) {
    this.selectedCompany = event.target.value;
    this.applyFilters();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

viewDetails(productId: number) {
  this.router.navigate(['/details', productId]);
}
  

  updateTotal() {
    if (this.selectedProduct) {
      this.totalPrice = this.selectedProduct.price * this.quantity;
    }
  }
}
