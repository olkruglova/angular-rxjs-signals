import { Component, inject } from '@angular/core';
import { DemoService } from '../demo/demo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
  standalone: true,
})
export class DisplayComponent {
  private demoService = inject(DemoService);

  readonly product$ = this.demoService.product$;
}
