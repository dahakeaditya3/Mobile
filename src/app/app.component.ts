import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/ReusebleComponent/toast/toast.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private toastService: ToastService) { }

  ngAfterViewInit() {
    this.toastService.register(this.toast);
  }
}
