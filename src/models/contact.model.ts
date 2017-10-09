import {AddressModel} from "./address.model";
import {ContactDto} from "../dtos/contact.dto";

export class ContactModel {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    img: string;
    addresses: AddressModel[];

    constructor(contactDto?: ContactDto) {
        if (contactDto) {
            this.id = contactDto.id;
            this.name = contactDto.first_name + contactDto.last_name;
            this.firstName = contactDto.first_name;
            this.lastName = contactDto.last_name;
            this.img = contactDto.avatar;
        }
    }
}