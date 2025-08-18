import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,  // <--- important
  imports: [CommonModule],  // <--- this enables *ngFor, *ngIf
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  showAll: boolean = false;

  constructor(private productService: AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleView() {
    this.showAll = !this.showAll;
  }
}
