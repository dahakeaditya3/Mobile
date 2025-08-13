import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts = [
    { name: 'iPhone 14 Pro', price: 120000, oldPrice: 130000, image: 'assets/iphone14pro.jpg', category: 'Mobiles' },
    { name: 'Samsung Galaxy S23', price: 115000, oldPrice: 125000, image: 'assets/s23.jpg', category: 'Mobiles' },
    { name: 'Redmi Note 12 Pro', price: 28000, oldPrice: 32000, image: 'assets/redmi12pro.jpg', category: 'Mobiles' },
    { name: 'Oppo Reno 8', price: 38000, oldPrice: 42000, image: 'assets/opporeno8.jpg', category: 'Mobiles' }
  ];
}
