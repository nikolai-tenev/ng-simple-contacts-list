import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {ContactModel} from "../../models/contact.model";
import {AddressService} from "../../services/address.service";
import {AddressModel} from "../../models/address.model";

@Component({
    selector: '.contact-details-page',
    templateUrl: './contact-details-page.component.html'
})
export class ContactDetailsPageComponent implements OnInit {
    contact: ContactModel;

    constructor(private contactService: ContactService,
                private addressService: AddressService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                let id: number = +params.get('id');
                let name: string = params.get('name');
                if (id > 0) {
                    return this.contactService.getContact(id)
                } else if (name.length > 0) {
                    let names = name.split(" ");
                    let newContact = new ContactModel();
                    newContact.firstName = names[0];
                    newContact.lastName = names[1];
                    newContact.name = name;
                    return Promise.resolve(newContact);
                }
            })
            .subscribe(contact => {
                this.contact = contact;
                if (contact.id) {
                    this.addressService.getAddressesByContactId(contact.id).then((addresses: AddressModel[]) => {
                        this.contact.addresses = addresses;
                    });
                }
            });
    }

    addNewAddress(): void {
        if (!this.contact.addresses) {
            this.contact.addresses = [];
        }

        let newAddress = new AddressModel();
        newAddress.contact = this.contact;

        this.contact.addresses.push(newAddress);
    }

    delete(addressIndex: number): void {
        let addrToDelete = this.contact.addresses.splice(addressIndex, 1)[0];

        if (addrToDelete.id) {
            this.addressService.delete(addrToDelete.id);
        }
    }

    save(): void {
        let operation;
        if (this.contact.id) {
            operation = this.contactService.update;
        } else {
            operation = this.contactService.create;
        }
        operation(this.contact).then((respContact: ContactModel) => {
            this.contact.id = respContact.id;

            this.contact.addresses.forEach((addr: AddressModel) => {
                let addrOperation;
                if (addr.id) {
                    addrOperation = this.addressService.update;
                } else {
                    addrOperation = this.addressService.create;
                }
                addrOperation(addr).then((respAddr) => {
                    addr.id = respAddr.id;
                });
            });
        });
    }
}