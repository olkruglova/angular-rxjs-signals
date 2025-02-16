import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-demo',
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css',
})
export class DemoComponent {
  public errorMessage = '';
  public data: any;
  private demoService = inject(DemoService);

  readonly products$ = this.demoService.productsResult$.pipe(
    map((resp) => resp.data),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  readonly selectedProduct$ = this.demoService.productSelected$;

  onSelected(productId: number): void {
    this.demoService.productSelected(productId);
  }
}
