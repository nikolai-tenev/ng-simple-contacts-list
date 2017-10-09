import {ContactModel} from "../models/contact.model";

export class ContactDto {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;

    constructor(contactModel?: ContactModel) {
        if (contactModel) {
            this.id = contactModel.id;
            this.first_name = contactModel.firstName;
            this.last_name = contactModel.lastName;
            this.avatar = contactModel.img;
        }
    }

}