import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ContactModel} from "../../models/contact.model";
import {Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
    selector: '.contacts-page',
    templateUrl: './contacts-page.component.html'
})
export class ContactsPageComponent implements OnInit {
    contacts: ContactModel[] = [];
    error: any;

    constructor(private router: Router,
                private contactService: ContactService) {
    }

    fetchContacts(): void {
        this.contactService
            .getContacts()
            .then(contacts => this.contacts = contacts)
            .catch(error => this.error = error);
    }

    ngOnInit(): void {
        this.fetchContacts();
    }
}
