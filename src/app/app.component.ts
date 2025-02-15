import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, fromEvent, map, of, Subscription } from 'rxjs';

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

    ngOnInit() {
        this.subscription.add(
            of(2,4,6,8).pipe(map(item => item *2)).subscribe(item => console.log(item))
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

        const apples$ = from([{id: 1, type: 'Granny Smith'}, {id: 2, type: 'Macintosh'}, {id: 3, type: 'Gala'}]);

        this.subscription.add(
            apples$
            .pipe(
                map(apple =>({...apple, color: 'red'})),
            )
            
            .subscribe({
                next: apple => console.log(apple),
                error: err => console.error(err),
                complete: () => console.log('Complete')
            })
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
