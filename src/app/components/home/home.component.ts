import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
  imports: [CommonModule, FooterComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  products: IProduct[] = [];
  displayedProducts: IProduct[] = [];
  showAll: boolean = false;

  // 👉 change numeric stats for animation
  stats = [
    { value: 10, suffix: '+', label: 'Years Experience', displayValue: 0 },
    { value: 99, suffix: 'Cr+', label: 'Users', displayValue: 0 },
    { value: 50000, suffix: '+', label: 'Positive Reviews', displayValue: 0 },
    { value: 600, suffix: '+', label: 'Trusted Partners', displayValue: 0 }
  ];

  private observer?: IntersectionObserver;
  private animated = false;
  sellerId!: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    const sellerId = Number(localStorage.getItem('userId'));
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.displayedProducts = this.products.slice(0, 12);
    });
  }

  ngAfterViewInit(): void {
    const statsSection = this.el.nativeElement.querySelector('.stats-section');
    if (statsSection) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated) {
            this.startCountUp();
            this.animated = true;
          }
        });
      }, { threshold: 0.5 });

      this.observer.observe(statsSection);
    }
  }

  startCountUp() {
    this.stats.forEach(stat => {
      let start = 0;
      const end = stat.value;
      const duration = 1500;
      const stepTime = 30;
      const increment = end / (duration / stepTime);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          stat.displayValue = end;
          clearInterval(counter);
        } else {
          stat.displayValue = Math.floor(start);
        }
      }, stepTime);
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
