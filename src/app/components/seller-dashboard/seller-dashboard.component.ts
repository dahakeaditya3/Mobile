
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerNavComponent } from '../seller-nav/seller-nav.component';
import { SellerOrder } from '../../models/order';
import { ToastService } from '../../services/toast.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, SellerNavComponent, FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  @ViewChild('ordersContent') ordersContent!: ElementRef;

  orders: SellerOrder[] = [];
  filteredOrders: SellerOrder[] = [];
  sellerId: number = 0;
  totalOrders = 0;
  pendingOrders = 0;
  confirmedOrders = 0;
  shippedOrders = 0;
  deliveredOrders = 0;
  cancelledOrders = 0;
  pendingQuantity = 0;
  confirmedQuantity = 0;
  shippedQuantity = 0;
  deliveredQuantity = 0;
  cancelledQuantity = 0;
  totalQuantity = 0;
  totalPrice = 0;
  pendingTotal = 0;
  confirmedTotal = 0;
  shippedTotal = 0;
  deliveredTotal = 0;
  cancelledTotal = 0;
  filterFrom = '';
  filterTo = '';
  months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
];

years: number[] = [];
selectedMonth: string = '';
selectedYear: string = '';


  constructor(
    private orderService: OrderService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  const role = localStorage.getItem('role');
  if (role === 'Seller') {
    this.sellerId = Number(localStorage.getItem('userId'));
    this.loadOrders();
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 5; y--) {
      this.years.push(y);
    }
  }
}


 loadOrders(): void {
  this.orderService.getOrdersBySellerr(this.sellerId).subscribe({
    next: (data) => {
      this.orders = data; 
      this.calculateOrderSummary(); 
    },
    error: (err) => {
      console.error(err);
    }
  });
}


  calculateOrderSummary(): void {
  this.totalOrders = this.orders.length;
  this.totalQuantity = this.orders.reduce((sum, o) => sum + o.quantity, 0);
  this.totalPrice = this.orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const pending = this.orders.filter(o => o.status === 'Pending');
  this.pendingOrders = pending.length;
  this.pendingQuantity = pending.reduce((sum, o) => sum + o.quantity, 0);
  this.pendingTotal = pending.reduce((sum, o) => sum + o.totalPrice, 0);

  const confirmed = this.orders.filter(o => o.status === 'Confirmed');
  this.confirmedOrders = confirmed.length;
  this.confirmedQuantity = confirmed.reduce((sum, o) => sum + o.quantity, 0);
  this.confirmedTotal = confirmed.reduce((sum, o) => sum + o.totalPrice, 0);

  const shipped = this.orders.filter(o => o.status === 'Shipped');
  this.shippedOrders = shipped.length;
  this.shippedQuantity = shipped.reduce((sum, o) => sum + o.quantity, 0);
  this.shippedTotal = shipped.reduce((sum, o) => sum + o.totalPrice, 0);

  const delivered = this.orders.filter(o => o.status === 'Delivered');
  this.deliveredOrders = delivered.length;
  this.deliveredQuantity = delivered.reduce((sum, o) => sum + o.quantity, 0);
  this.deliveredTotal = delivered.reduce((sum, o) => sum + o.totalPrice, 0);

  const cancelled = this.orders.filter(o => o.status === 'Cancelled');
  this.cancelledOrders = cancelled.length;
  this.cancelledQuantity = cancelled.reduce((sum, o) => sum + o.quantity, 0);
  this.cancelledTotal = cancelled.reduce((sum, o) => sum + o.totalPrice, 0);
}



applyFilter(): void {
  const from = this.filterFrom ? new Date(this.filterFrom + 'T00:00:00') : null;
  const to = this.filterTo ? new Date(this.filterTo + 'T23:59:59') : null;

  this.filteredOrders = this.orders.filter(order => {
    const orderDate = new Date(order.createdOn);
    if (from && orderDate < from) return false;
    if (to && orderDate > to) return false;
    return true;
  });

  const tempOrders = this.filteredOrders;
  this.orders = tempOrders;
  this.calculateOrderSummary();
}

  applyMonthYearFilter(): void {
  this.filteredOrders = this.orders.filter(order => {
    const orderDate = new Date(order.createdOn);
    if (this.selectedMonth && orderDate.getMonth() + 1 !== +this.selectedMonth) return false;
    if (this.selectedYear && orderDate.getFullYear() !== +this.selectedYear) return false;
    return true;
  });
  this.calculateOrderSummaryForFiltered();
}

resetMonthYearFilter(): void {
  this.selectedMonth = '';
  this.selectedYear = '';
  this.filteredOrders = [...this.orders];
  this.calculateOrderSummaryForFiltered();
}
calculateOrderSummaryForFiltered(): void {
  const ordersToUse = this.filteredOrders;

  this.totalOrders = ordersToUse.length;
  this.totalQuantity = ordersToUse.reduce((sum, o) => sum + o.quantity, 0);
  this.totalPrice = ordersToUse.reduce((sum, o) => sum + o.totalPrice, 0);

  const pending = ordersToUse.filter(o => o.status === 'Pending');
  this.pendingOrders = pending.length;
  this.pendingQuantity = pending.reduce((sum, o) => sum + o.quantity, 0);
  this.pendingTotal = pending.reduce((sum, o) => sum + o.totalPrice, 0);

  const confirmed = ordersToUse.filter(o => o.status === 'Confirmed');
  this.confirmedOrders = confirmed.length;
  this.confirmedQuantity = confirmed.reduce((sum, o) => sum + o.quantity, 0);
  this.confirmedTotal = confirmed.reduce((sum, o) => sum + o.totalPrice, 0);

  const shipped = ordersToUse.filter(o => o.status === 'Shipped');
  this.shippedOrders = shipped.length;
  this.shippedQuantity = shipped.reduce((sum, o) => sum + o.quantity, 0);
  this.shippedTotal = shipped.reduce((sum, o) => sum + o.totalPrice, 0);

  const delivered = ordersToUse.filter(o => o.status === 'Delivered');
  this.deliveredOrders = delivered.length;
  this.deliveredQuantity = delivered.reduce((sum, o) => sum + o.quantity, 0);
  this.deliveredTotal = delivered.reduce((sum, o) => sum + o.totalPrice, 0);

  const cancelled = ordersToUse.filter(o => o.status === 'Cancelled');
  this.cancelledOrders = cancelled.length;
  this.cancelledQuantity = cancelled.reduce((sum, o) => sum + o.quantity, 0);
  this.cancelledTotal = cancelled.reduce((sum, o) => sum + o.totalPrice, 0);
}

}



