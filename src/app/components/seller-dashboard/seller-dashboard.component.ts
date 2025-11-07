import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerNavComponent } from '../seller-nav/seller-nav.component';
import { SellerOrder } from '../../models/order';
import { ToastService } from '../../services/toast.service';
import { OrderService } from '../../services/order.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, SellerNavComponent, FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  @ViewChild('ordersContent') ordersContent!: ElementRef;
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  salesChart!: Chart;

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
  @ViewChild('companySalesChart') companySalesChartRef!: ElementRef<HTMLCanvasElement>;
  companySalesChart!: Chart;


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
        this.filteredOrders = [...data];
        this.calculateOrderSummaryForFiltered();
        this.generateMonthlySalesChart();
        this.generateCompanySalesChart();

      },
      error: (err) => {
        console.error(err);
      }
    });
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

  applyMonthYearFilter(): void {
    this.filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.createdOn);
      if (this.selectedMonth && orderDate.getMonth() + 1 !== +this.selectedMonth) return false;
      if (this.selectedYear && orderDate.getFullYear() !== +this.selectedYear) return false;
      return true;
    });

    this.calculateOrderSummaryForFiltered();
    this.generateMonthlySalesChart();
  }

  resetMonthYearFilter(): void {
    this.selectedMonth = '';
    this.selectedYear = '';
    this.filteredOrders = [...this.orders];
    this.calculateOrderSummaryForFiltered();
    this.generateMonthlySalesChart();
    this.generateCompanySalesChart();

  }

  generateMonthlySalesChart(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }

    const monthlySales = new Array(12).fill(0);
    this.filteredOrders.forEach(order => {
      const date = new Date(order.createdOn);
      const monthIndex = date.getMonth();
      monthlySales[monthIndex] += order.totalPrice;
    });

    const backgroundColors = Array.from({ length: 12 }, (_, i) =>
      `hsl(${(i * 30) % 360}, 80%, 79%)`
    );
    const borderColors = backgroundColors.map(c => c.replace('10%', '90%'));

    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Sales (₹)',
          data: monthlySales,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Sales (₹)' }
          },
          x: {
            title: { display: true, text: 'Month' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `₹${ctx.formattedValue}`
            }
          }
        }
      }
    });
  }


  generateCompanySalesChart(): void {
    if (this.companySalesChart) {
      this.companySalesChart.destroy();
    }

    const companySales: { [key: string]: number } = {};

    this.filteredOrders.forEach(order => {
      const company = order.product.company || 'Unknown';
      companySales[company] = (companySales[company] || 0) + order.totalPrice;
    });

    const companyNames = Object.keys(companySales);
    const companyTotals = Object.values(companySales);

    const backgroundColors = companyNames.map(() =>
      `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`
    );
    const borderColors = backgroundColors.map(color => color.replace('26%', '50%'));

    const ctx = this.companySalesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.companySalesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: companyNames,
        datasets: [{
          label: 'Sales by Company (₹)',
          data: companyTotals,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Sales (₹)' }
          },
          x: {
            title: { display: true, text: 'Company' },
            ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `₹${ctx.formattedValue}`
            }
          }
        }
      }
    });
  }


}
