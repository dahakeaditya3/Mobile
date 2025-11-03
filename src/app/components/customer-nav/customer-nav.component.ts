import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-nav.component.html',
  styleUrl: './customer-nav.component.css'
})
export class CustomerNavComponent {
  
}
