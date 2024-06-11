import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts/contacts.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  imports: [
    CommonModule,
    NavbarComponent
  ]
})
export class ContactsComponent implements OnInit {

  page = 1;
  contacts: any = [];
  paginate = {
    current_page: 1,
    total_pages: 1
  };

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const response = await this.contactsService.getContacts(this.page);
    if (response.data) {
      this.contacts = response.data;
      this.paginate = {
        current_page: response.current_page,
        total_pages: response.total
      }
    }
  }

  seeDetails(contactId: number) {
    this.router.navigateByUrl(`details/${contactId}`)
  }

  addContact() {
    this.router.navigateByUrl('add-contact');
  }

  editContact(contactId: number) {
    this.router.navigateByUrl(`edit-contact/${contactId}`);
  }

  async deleteContact(contactId: number) {
    const response = await this.contactsService.deleteContact(contactId);
    if (response) {
      this.getUsers();
    }
  }

}
