import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  from,
  map,
  of,
  range,
  shareReplay,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);

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
}
