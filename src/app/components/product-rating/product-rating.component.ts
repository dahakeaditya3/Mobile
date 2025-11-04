import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
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
  ratingsCount: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private ratingService: ProductRatingService) { }

  ngOnInit(): void {
    this.loadAverageRating();
  }

  rate(value: number) {
    this.selectedRating = value;
  }

  submitRating() {
    if (!this.selectedRating) return alert('Please select a rating!');

    const rating: ProductRating = {
      productId: this.productId,
      customerId: this.customerId,
      ratingValue: this.selectedRating,
      review: this.reviewText
    };

    this.ratingService.addRating(rating).subscribe(() => {

      this.selectedRating = 0;
      this.reviewText = '';
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
