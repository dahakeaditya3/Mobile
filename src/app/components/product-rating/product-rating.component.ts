import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductRatingService } from '../../services/product-rating.service';
import { ProductRating } from '../../models/product-rating.model';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {
  @Input() productId!: number;
  @Input() customerId!: number;
  @Output() ratingSubmitted = new EventEmitter<void>();

  averageRating: number = 0;
  selectedRating: number = 0;
  reviewText: string = '';
  stars: number[] = [1, 2, 3, 4, 5];

  // Image files
  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
  image4?: File | null;

  constructor(private ratingService: ProductRatingService) { }

  ngOnInit(): void {
    this.loadAverageRating();
  }

  rate(value: number) {
    this.selectedRating = value;
  }

  // Handle file selections
  onFileSelect(event: any, imageField: string) {
    const file = event.target.files?.[0] ?? null;
    (this as any)[imageField] = file;
  }

  submitRating() {
    if (!this.selectedRating) {
      alert('Please select a rating!');
      return;
    }

    const rating: ProductRating = {
      productId: this.productId,
      customerId: this.customerId,
      ratingValue: this.selectedRating,
      review: this.reviewText,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4
    };

    this.ratingService.addRating(rating).subscribe(() => {
      // Reset UI
      this.selectedRating = 0;
      this.reviewText = '';
      this.image1 = this.image2 = this.image3 = this.image4 = null;

      this.loadAverageRating();
      this.ratingSubmitted.emit();
    });
  }

  loadAverageRating() {
    this.ratingService.getAverageRating(this.productId).subscribe(avg => {
      this.averageRating = avg;
    });
  }
}
