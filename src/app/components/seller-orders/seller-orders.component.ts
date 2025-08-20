import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent {
  @Input() orders: any[] = [
    {
      id: "88e6",
      productId: "bf2a",
      productName: "Oppo Reno 8",
      price: 29999,
      images: [
        "assets/images/oppo.jpg",
        "assets/images/apple.jpg",
        "assets/images/apple.jpg",
        "assets/images/apple.jpg"
      ],
      customer_id: 1755666752773,
      customerName: "shreyash dautpure",
      customerPhone: "9022350575",
      customerAddress: "talegaon",
      orderDate: "20-8-2025"
    }
  ];
}
