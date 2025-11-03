import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role = 'Customer';
  error = '';
 username!:string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService 
    
  ) { }

  submit() {
    this.authService.login(this.email, this.password, this.role).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('role', res.role);

        if (res.role === 'Customer') {
          this.toast.show('Welcome, logged in successfully', 'success');
          this.router.navigate(['/main']);
        } else {
          
         this.toast.show('Welcome, logged in successfully', 'success');
          this.router.navigate(['/seller-dashboard']);
        }
      },
      error: () => {
        this.toast.show('Invalid credentials', 'warning');
      }
    });
  }
}
