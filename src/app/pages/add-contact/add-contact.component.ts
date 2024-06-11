import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhonesService } from '../../services/phones/phones.service';
import { EmailsService } from '../../services/emails/emails.service';
import { AddressesService } from '../../services/addresses/addresses.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent implements OnInit {

  contactForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      addresses: this.fb.array([])
    }
  );

  submitted = false

  id: number = 0;
  private sub: any;
  contactData: any;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private phonesService: PhonesService,
    private emailsService: EmailsService,
    private addressesService: AddressesService,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        if (this.id && this.id !== 0) {
          this.getContact();
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.id === 0) {
      this.addPhone();
      this.addEmail();
      this.addAddress();
    }
  }

  back() {
    this._location.back();
  }

  async fillForm() {
    console.log('contactData: ', this.contactData);
    this.contactForm.controls.name.setValue(this.contactData.name);
    if (this.contactData.phones.length > 0) {
      for (let index = 0; index < this.contactData.phones.length; index++) {
        this.phones.push(this.createPhoneFormGroup(this.contactData.phones[index].phone));
      }
    }

    if (this.contactData.emails.length > 0) {
      for (let index = 0; index < this.contactData.emails.length; index++) {
        this.emails.push(this.createEmailFormGroup(this.contactData.emails[index].email));
      }
    }

    if (this.contactData.addresses.length > 0) {
      for (let index = 0; index < this.contactData.addresses.length; index++) {
        const data = {
          state: this.contactData.addresses[index].state,
          city: this.contactData.addresses[index].city,
          address: this.contactData.addresses[index].address
        };
        this.addresses.push(this.createAddressFormGroup(data));
      }
    }

  }

  async getContact() {
    const response = await this.contactsService.getContactDetails(this.id);
    if (response) {
      this.contactData = response;
      this.fillForm();
    }
  }

  async onSubmit(theForm: FormGroup) {
    this.submitted = true;
    console.log('theForm: ', theForm.value.phones);
    if (theForm.valid) {
      const phones = [];
      const emails = [];
      const addresses = [];
      for (const phone of theForm.value.phones) {
        phones.push(phone);
      }
      for (const email of theForm.value.emails) {
        emails.push(email);
      }
      for (const address of theForm.value.addresses) {
        addresses.push({
          state: address.state,
          city: address.city,
          address: address.address
        });
      }
      const params = {
        name: theForm.value.name,
        phones: phones,
        emails: emails,
        addresses: addresses
      };
      if (this.id === 0) {
        const response = await this.contactsService.saveContact(params);
        if (response) {
          this.router.navigateByUrl('');
        }
      } else {
        const response = await this.contactsService.updateContact(params, this.id);
        if (response) {
          this.router.navigateByUrl('');
        }
      }
      
    }
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  createPhoneFormGroup(phoneNumber?: string): FormGroup {
    return this.fb.group({
      phone: new FormControl(phoneNumber || '', Validators.required)
    });
  }

  createEmailFormGroup(emailAddress?: string): FormGroup {
    return this.fb.group({
      email: new FormControl(emailAddress || '', Validators.required)
    });
  }

  createAddressFormGroup(address?: any): FormGroup {
    return this.fb.group({
      state: new FormControl((address && address.state) ||'', Validators.required),
      city: new FormControl((address && address.city) || '', Validators.required),
      address: new FormControl((address && address.address) || '', Validators.required)
    });
  }

  addPhone(): void {
    this.phones.push(this.createPhoneFormGroup());
  }

  async removePhone(index: number): Promise<void> {
    if (this.contactData.phones[index]) {
      const response = await this.phonesService.removePhone(this.contactData.phones[index].id)
    }
    this.phones.removeAt(index);
  }

  async updatePhone(index: number) {
    const phone = this.phones.controls[index].value.phone;
    const phoneId = this.contactData.phones[index].id;
    const params = {
      phone
    };
    
    const response = await this.phonesService.updatePhone(params, phoneId)
  }

  addEmail(): void {
    this.emails.push(this.createEmailFormGroup());
  }

  async removeEmail(index: number): Promise<void> {
    if (this.contactData.emails[index]) {
      const response = await this.emailsService.removeEmail(this.contactData.emails[index].id)
    }
    this.emails.removeAt(index);
  }

  async updateEmail(index: number) {
    const email = this.emails.controls[index].value.email;
    const emailId = this.contactData.emails[index].id;
    const params = {
      email
    };
    
    const response = await this.emailsService.updateEmail(params, emailId)
  }

  addAddress(): void {
    this.addresses.push(this.createAddressFormGroup());
  }

  async removeAddress(index: number): Promise<void> {
    if (this.contactData.addresses[index]) {
      const response = await this.addressesService.removeAddress(this.contactData.addresses[index].id)
    }
    this.addresses.removeAt(index);
  }

  async updateAddress(index: number) {
    const addressId = this.contactData.addresses[index].id;
    const params = {
      state: this.addresses.controls[index].value.state,
      city: this.addresses.controls[index].value.city,
      address: this.addresses.controls[index].value.address,
    };
    
    const response = await this.addressesService.updateAddress(params, addressId)
  }

}
