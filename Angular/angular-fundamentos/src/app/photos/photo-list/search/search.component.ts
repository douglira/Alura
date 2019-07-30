import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();
  @Input()
  filter: string;
  @Output()
  onChangeFilter = new EventEmitter<string>();

  ngOnInit (): void {
    this.debounce
      .pipe(debounceTime(350))
      .subscribe(filter => {
        this.filter = filter
        this.onChangeFilter.emit(this.filter)
      });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe()
  }
}
