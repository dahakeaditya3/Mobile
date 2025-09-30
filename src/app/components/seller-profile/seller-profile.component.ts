import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SellerNavComponent],
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
  sellerForm!: FormGroup;
  isEditing = false;
  dropdownOpen = false;
  isMenuOpen = true;

  constructor(private fb: FormBuilder, private sellerService: SellerService, private router: Router) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) { this.router.navigate(['/login']); return; }

    this.sellerService.getProfile(userId).subscribe(res => {
      this.sellerForm = this.fb.group({
        sellerName: [res.sellerName],
        storeName: [res.storeName],
        email: [res.email],
        contact: [res.contact],
        state: [res.state],
        city: [res.city],
        address: [res.address],
        creadedOn: [res.createdOn],
        profilePictureUrl: [res.profilePictureUrl]
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  updateProfile() {
    if (!this.sellerForm.valid) return;
    const updated = this.sellerForm.value;
    const userId = Number(localStorage.getItem('userId'));
    this.sellerService.updateProfile({ ...updated, sellerId: userId }).subscribe(() => this.isEditing = false);
  }

  onFileSelected(event: any) {
    if (!event.target.files || event.target.files.length === 0) return;
    const file: File = event.target.files[0];

    this.sellerService.uploadProfilePicture(file).subscribe(res => {
      this.sellerForm.patchValue({ profilePictureUrl: res.fileUrl });
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
