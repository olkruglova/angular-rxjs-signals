import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  selectedProductId = signal<number | undefined>(undefined);

  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl)
    .pipe(
      map(p => ({ data: p } )),
      tap(p => console.log(JSON.stringify(p))),
      shareReplay(1),
      catchError(err => of({
        data: [],
        error: console.error(err) //this.errorService.formatError(err)
      }))
    );
};
//   private getProductWithReviews(product: any): Observable<any> {
//     if (product.hasReviews) {
//       return this.http.get<any>(this.reviewService.getReviewUrl(product.id))
//         .pipe(
//           map(reviews => ({ ...product, reviews }))
//         )
//     } else {
//       return of(product);
//     }
//   }

}
