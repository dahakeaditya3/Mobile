

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavComponent } from '../customer-nav/customer-nav.component';
import { CustomerOrder } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ToastService } from '../../services/toast.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ProductRatingComponent } from "../product-rating/product-rating.component";

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule, CustomerNavComponent, ConfirmModalComponent, ProductRatingComponent],
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orders: CustomerOrder[] = [];
  private selectedOrder?: CustomerOrder;
  customerId!: number;
  showRatingModal = false;
  selectedProductId?: number;
  selectedOrderId?: number;
  ratingVisible: { [key: number]: boolean } = {};

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  constructor(private orderService: OrderService, private toast: ToastService) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('userId'));
    this.orderService.getOrdersByCustomer(this.customerId).subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Error fetching orders:', err),
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Confirmed': return 'bg-info';
      case 'Shipped': return 'bg-primary';
      case 'Delivered': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  canCancel(status: string): boolean {
    return status !== 'Shipped' && status !== 'Delivered' && status !== 'Cancelled';
  }

  cancelOrder(order: CustomerOrder) {
    this.selectedOrder = order;
    this.confirmModal.open('Are you sure you want to cancel this order?');
  }

  onConfirmCancel() {
    if (!this.selectedOrder) return;

    const dto = { newStatus: 'Cancelled' };
    this.orderService.updateOrderStatus(this.selectedOrder.id, dto).subscribe({
      next: () => {
        this.selectedOrder!.status = 'Cancelled';
        this.toast.show('Order cancelled successfully.', 'success');
        this.selectedOrder = undefined;
      },
      error: (err) => {
        console.error('Failed to cancel order:', err);
        this.toast.show('Error cancelling order.', 'error');
      },
    });
  }

  onCancelModal() {
    this.selectedOrder = undefined;
  }

  toggleRatingForm(orderId: number) {
    this.ratingVisible[orderId] = !this.ratingVisible[orderId];
  }




  openRatingModal(order: CustomerOrder) {
    this.selectedProductId = order.productId;
    this.selectedOrderId = order.id;
    this.showRatingModal = true;
  }

  closeRatingModal() {
    this.showRatingModal = false;
    this.selectedProductId = undefined;
    this.selectedOrderId = undefined;
  }

  onRatingSubmitted(orderId: number) {
    this.closeRatingModal();
    this.toast.show('Thank you for rating this product!', 'success');
  }

}