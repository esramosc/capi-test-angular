import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ContactsService } from '../../services/contacts/contacts.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { state } from '@angular/animations';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  page = 1;
  contacts: any = [];
  meta = {
    from: 0,
    to: 0,
    total: 0,
    current_page: 1,
    last_page: 1,
  };

  filterForm = new FormGroup({
    name: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    with: new FormControl('')
  });

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }


  close() {
    this.router.navigateByUrl('');
  }

  changePage(page: number) {
    this.page = page;
    this.search();
  }

  async search() {
    const params = {
      name: this.filterForm.controls.name.value,
      state: this.filterForm.controls.state.value,
      phone: this.filterForm.controls.phone.value,
      city: this.filterForm.controls.city.value
    };
    const response = await this.contactsService.getContactsByFilter(params, this.page);
    if (response.data) {
      this.contacts = response.data;
      this.meta = {
        current_page: response.current_page,
        total: response.total,
        to: response.to,
        last_page: response.last_page,
        from: response.from
      }
    }
  }

}
