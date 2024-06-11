import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts/contacts.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  id: number = 0;
  private sub: any;
  details: any = null;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private _location: Location
  ) { 
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getDetails();
    });
  }

  async getDetails() {
    const response = await this.contactsService.getContactDetails(this.id);
    console.log('response: ', response);
    if (response) {
      this.details = response;
    }
  }

  back() {
    this._location.back();
  }

}
