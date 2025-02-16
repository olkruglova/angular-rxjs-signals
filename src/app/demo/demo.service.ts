import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  from,
  map,
  of,
  range,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { displayData } from '../display/display-data';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);

  private productSelectedSubject = new BehaviorSubject<number | null>(null);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly productsResult$ = of([1, 2, 3, 4, 5]).pipe(
    tap((x) => console.log('Before map:', x)),
    map((data) => ({ data })),
    tap((x) => console.log('After map:', x)),
    shareReplay(1),
    catchError((err: HttpErrorResponse) => {
      console.error(err);
      return of({ data: [], error: 'An error occurred' });
    })
  );

  readonly product$ = this.productSelected$.pipe(
    map((selectedProductId) => displayData[selectedProductId!])
  );

  productSelected(productId: number): void {
    this.productSelectedSubject.next(productId);
  }
}
