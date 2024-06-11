import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() meta: any;
  @Output() changePage = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  goToPage(event: any, page: number) {
    event.preventDefault();
    if (page >= 1 && page <= this.meta.last_page) {
      if (page !== this.meta.current_page) {
        this.changePage.emit(page);
      }
    }
  }

}
