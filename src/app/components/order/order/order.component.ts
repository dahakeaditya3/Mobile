import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  product!: Product;
  showForm = false;
  customer = { name: '', phone: '', address: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }

  buyNow() {
    this.showForm = true;
  }

  submitOrder() {
    const today = new Date();
    const orderDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    // ✅ Get logged in customer from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    let customer_id: number | null = null;
    let customerName = '';
    let customerPhone = '';
    let customerAddress = '';

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // ✅ IMPORTANT: use customer_id, not id
      customer_id = user.customer_id;
      customerName = user.name;
      customerPhone = user.phone;
      customerAddress = user.city; // or address if exists
    }

    const newOrder = {
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price,
      images: [
        this.product.image1,
        this.product.image2,
        this.product.image3,
        this.product.image4
      ],

      // customer info
      customer_id: customer_id,
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      orderDate: orderDate
    };

    this.orderService.placeOrder(newOrder).subscribe(() => {
      alert('Order placed successfully!');
      this.router.navigate(['/main-page']);
    });
  }


}
