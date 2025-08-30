import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '99Cr+', label: 'Users' },
    { value: '50000+', label: 'Positive Reviews' },
    { value: '600+', label: 'Trusted Partners' }
  ];

  attorneys = [
    { name: 'Wade Warren', role: 'Attorney', img: 'assets/images/ee.webp' },
    { name: 'Jerome Bell', role: 'Attorney', img: 'assets/images/riya.jpg' },
    { name: 'Arlene McCoy', role: 'Attorney', img: 'assets/images/shreya.webp' }
  ];

  services = [
    {
      title: 'Inventory Management:',
      description: 'We build scalable and robust mobile applications tailored to your needs.',
      icon: 'bi bi-phone',
    },
    {
      title: 'Digital Marketing',
      description: 'Helping businesses stay connected with advanced mobility solutions.',
      icon: 'bi bi-people',
    },
    {
      title: 'Software Consulting',
      description: 'Expert guidance for your software strategies and digital transformation.',
      icon: 'bi bi-lightbulb',
    },
    {
      title: 'UI/UX Design',
      description: 'Crafting intuitive and engaging user experiences with modern design trends.',
      icon: 'bi bi-brush',
    },
    {
      title: 'Data Analytics',
      description: 'Seamless integration with cloud platforms to ensure scalability and security.',
      icon: 'bi bi-cloud-arrow-up',
    },
    {
      title: 'E-commerce Solutions',
      description: 'Building powerful online stores with secure payments and smooth checkout.',
      icon: 'bi bi-cart-check',
    }
  ];

}
