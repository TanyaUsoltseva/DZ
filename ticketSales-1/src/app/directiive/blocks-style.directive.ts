import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Input() items = []


  @Output() renderComplete = new EventEmitter();


  private index: number = 0;
  public activeElementIndex: number;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.activeElementIndex = 0

    if  (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);

      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    } else {
      console.error('Не передан селектор')
    }


    setTimeout(() => {
      this.renderComplete.emit(true);
    })

  }

  ngOnChanges(data: SimpleChanges): void {

  }

  initKeyUp(ev: KeyboardEvent): void {
    console.log('ev', ev);
    console.log('this.items', this.items, 'index', this.index);


    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement)?.removeAttribute('style');
    }


    if (ev.key === 'ArrowRight') {
      if (this.index !== this.items.length - 1){
        this.index++;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
      }
      }

    } else if (ev.key === 'ArrowLeft') {
      if (this.index !== 0) {
        this.index--;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement). setAttribute('style', 'border: 2px solid red');
      }
      }
    }

    this.activeElementIndex = this.index
  }

  initStyle(index: number) {
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style','border: 2px solid red')
    }
  }

}
