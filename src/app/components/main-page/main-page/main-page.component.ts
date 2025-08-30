import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FooterComponent } from '../../footer/footer.component';
import { IProduct } from '../../../models/interface/products.interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  paginatedProducts: IProduct[] = [];
  companies: string[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  // Filters
  selectedPriceOrder: string = '';
  selectedCompany: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.companies = [...new Set(data.map(p => p.productCompany))]; // unique companies
        this.applyFilters();
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  // Apply both filters together
  applyFilters(): void {
    let result = [...this.products];

    // Company filter
    if (this.selectedCompany) {
      result = result.filter(p => p.productCompany === this.selectedCompany);
    }

    // Price filter
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

  // Filter change handlers
  onPriceFilterChange(event: any) {
    this.selectedPriceOrder = event.target.value;
    this.applyFilters();
  }

  onCompanyFilterChange(event: any) {
    this.selectedCompany = event.target.value;
    this.applyFilters();
  }

  // Pagination
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

  orderNow(product: IProduct) {
    this.router.navigate(['/order', product.productId]);
  }

}
