// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SellerNavComponent } from '../seller-nav/seller-nav.component';
// import { SellerOrder } from '../../models/order';
// import { HttpClient } from '@angular/common/http';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { FormsModule } from '@angular/forms';
// import { ToastService } from '../../services/toast.service';

// @Component({
//   selector: 'app-seller-orders',
//   standalone: true,
//   imports: [CommonModule, SellerNavComponent, FormsModule],
//   templateUrl: './seller-order.component.html',
//   styleUrls: ['./seller-order.component.css']
// })
// export class SellerOrdersComponent implements OnInit {
//   @ViewChild('ordersContent') ordersContent!: ElementRef;


//   orders: SellerOrder[] = [];
//   filteredOrders: SellerOrder[] = [];
//   sellerId: number = 0;
//   loading: boolean = false;

//   filterFrom!: string;
//   filterTo!: string;

//   constructor(private http: HttpClient, private toast: ToastService) { }

//   ngOnInit(): void {
//     const role = localStorage.getItem('role');
//     if (role === 'Seller') {
//       this.sellerId = Number(localStorage.getItem('userId'));
//       this.loadOrders();
//     }
//   }

//   loadOrders() {
//     this.loading = true;
//     this.http.get<SellerOrder[]>(`https://localhost:7011/api/orders/byseller/${this.sellerId}`)
//       .subscribe({
//         next: (data) => {
//           this.orders = data;
//           this.filteredOrders = [...this.orders];
//           this.loading = false;
//         },
//         error: (err) => console.error(err)
//       });
//   }

//   applyFilter() {
//     let from = this.filterFrom ? new Date(this.filterFrom) : null;
//     let to = this.filterTo ? new Date(this.filterTo) : null;

//     this.filteredOrders = this.orders.filter(order => {
//       let orderDate = new Date(order.createdOn);
//       if (from && orderDate < from) return false;
//       if (to && orderDate > to) return false;
//       return true;
//     });
//   }

//   resetFilter() {
//     this.filterFrom = '';
//     this.filterTo = '';
//     this.filteredOrders = [...this.orders];
//   }


//   exportPDF() {
//     const data = this.ordersContent.nativeElement;

//     html2canvas(data, { scale: 2 }).then(canvas => {
//       const imgWidth = 210;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       const pdf = new jsPDF('p', 'mm', 'a4');
//       let position = 0;
//       let heightLeft = imgHeight;

//       const contentDataURL = canvas.toDataURL('image/png');
//       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save('orders.pdf');
//     });
//   }
//   updateStatus(order: SellerOrder) {
//     const dto = { newStatus: order.status };

//     this.http
//       .put(`https://localhost:7011/api/orders/${order.id}/status`, dto)
//       .subscribe({
//         next: () => {
//           this.toast.show(`Order ${order.id} status updated to ${order.status}`, 'success');
//         },
//         error: (err) => {
//           console.error(err);
//           this.toast.show('Failed to update order status', 'error');
//         }
//       });
//   }

//   getStatusClass(status: string): string {
//     switch (status) {
//       case 'Pending': return 'bg-warning text-dark';
//       case 'Confirmed': return 'bg-info';
//       case 'Shipped': return 'bg-primary';
//       case 'Delivered': return 'bg-success';
//       case 'Cancelled': return 'bg-danger';
//       default: return 'bg-secondary';
//     }
//   }

// }









import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerNavComponent } from '../seller-nav/seller-nav.component';
import { SellerOrder } from '../../models/order';
import { ToastService } from '../../services/toast.service';
import { OrderService } from '../../services/order.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [CommonModule, SellerNavComponent, FormsModule],
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrdersComponent implements OnInit {
  @ViewChild('ordersContent') ordersContent!: ElementRef;

  orders: SellerOrder[] = [];
  filteredOrders: SellerOrder[] = [];
  sellerId: number = 0;
  loading = false;

  filterFrom = '';
  filterTo = '';

  constructor(
    private orderService: OrderService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === 'Seller') {
      this.sellerId = Number(localStorage.getItem('userId'));
      this.loadOrders();
    }
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrdersBySellerr(this.sellerId).subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = [...this.orders];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const from = this.filterFrom ? new Date(this.filterFrom) : null;
    const to = this.filterTo ? new Date(this.filterTo) : null;

    this.filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.createdOn);
      if (from && orderDate < from) return false;
      if (to && orderDate > to) return false;
      return true;
    });
  }

  resetFilter(): void {
    this.filterFrom = '';
    this.filterTo = '';
    this.filteredOrders = [...this.orders];
  }

  exportPDF(): void {
    const data = this.ordersContent.nativeElement;

    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('orders.pdf');
    });
  }

  updateStatus(order: SellerOrder): void {
    const dto = { newStatus: order.status };

    this.orderService.updateOrderStatus(order.id, dto).subscribe({
      next: () => {
        this.toast.show(`Order ${order.id} status updated to ${order.status}`, 'success');
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Failed to update order status', 'error');
      }
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
}
