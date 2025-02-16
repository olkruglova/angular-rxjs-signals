import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concatMap, delay, filter, from, fromEvent, map, mergeMap, of, range, Subscription, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-rxjs-signals';

  subscription: Subscription = new Subscription();

  randomDelay() {
    //random delay between 500 and 1500 ms
    return Math.floor(Math.random() * 1000) + 500;
  }

    ngOnInit() {
        this.subscription.add(
            of(2,4,5,1,0,6,8,11,12).pipe(filter(x => x % 2 === 0), map(item => item *2), tap(item => console.log(item))).subscribe()
        )

        this.subscription.add(
            of([2,4,6,8]).pipe(map(item => [...item, 33])).subscribe(arr => console.log("111", arr))
        )

        this.subscription.add(
            from([10, 20, 30, 40]).subscribe({
                next: item => console.log(item),
                error: err => console.error(err),
                complete: () => console.log('Complete')
            })
        )
    
        this.subscription.add(
            of("aaa", "bbb", "ccc").subscribe({
                next: item => console.log(item),
                error: err => console.error(err),
                complete: () => console.log('Complete')
            })
        )

            
        this.subscription.add(
            fromEvent(document, "click").subscribe({
                next: event => console.log(event.target),
                error: err => console.error(err),
                complete: () => console.log('Complete')
            })
        )

        this.subscription.add(
            fromEvent(document, "keydown").subscribe({
                next: event => console.log((event as KeyboardEvent).key),
                error: err => console.error(err),
                complete: () => console.log('Complete')
            })
        )

        this.subscription.add(
            timer(0, 1000).pipe(
                take(5)
            ).subscribe({
                // next: timer => console.log("Timer: ", timer),
                // error: err => console.error(err),
                // complete: () => console.log('No more ticks')
            })
        )

        const apples$ = from([{id: 1, type: 'Granny Smith'}, {id: 2, type: 'Macintosh'}, {id: 3, type: 'Gala'}]);

        this.subscription.add(
            apples$
            .pipe(
                filter(i => i.id >= 2),
                map(apple =>({...apple, color: 'red'})),
                tap(apple => console.log(apple))
            )
            .subscribe()
        )

        range(1, 5).pipe(
            concatMap(i => of(i)
                .pipe(
                    delay(this.randomDelay())
                )
        )).subscribe(data => console.log("concatMap", data))

        range(11, 5).pipe(
           mergeMap(i => of(i)
                .pipe(
                    delay(this.randomDelay())
                )
        )).subscribe(data => console.log("mergeMap: ", data))

        range(21, 5).pipe(
            switchMap(i => of(i)
                 .pipe(
                     delay(this.randomDelay())
                 )
         )).subscribe(data => console.log("switchMap: ", data))
    }

    

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
