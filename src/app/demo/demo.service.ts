import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, concatMap, from, map, of, range, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);

  productsResult$ = of([1, 2, 3, 4, 5]).pipe(
    tap((x) => console.log('Before map:', x)),
    map((data) => ({ data })),
    tap((x) => console.log('After map:', x)),
    catchError((err: HttpErrorResponse) => {
      console.error(err);
      return of({ data: [], error: 'An error occurred' });
    })
  );
}
