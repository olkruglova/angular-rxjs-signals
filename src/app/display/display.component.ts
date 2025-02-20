import { Component, computed, effect, inject, signal } from '@angular/core';
import { DemoService } from '../demo/demo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display',
  imports: [CommonModule, FormsModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
  standalone: true,
})
export class DisplayComponent {
  private demoService = inject(DemoService);

  readonly product$ = this.demoService.product$;

  quantity = signal<number>(1);
  quantities = signal<number[]>([1, 2, 3, 4, 5]);
  selectedProduct = signal<Product>({ id: 1, name: 'Product 1', price: 100 });

  exPrice = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => (this.exPrice() > 50 ? 'green' : 'blue'));

  e = effect(() => console.log('In effect price: ', this.exPrice()));

  constructor() {
    console.log('In DisplayComponent constructor', this.quantity);

    effect(() => console.log('In effect quantity: ', this.quantity()));

    this.quantity.update((q) => q * 2);
  }

  onQuantitySelected(quantity: number): void {
    this.quantity.set(quantity);
    // this.quantity.set(67);
    // this.quantity.set(100);
    // this.quantity.set(45);
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
