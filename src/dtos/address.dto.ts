import {AddressModel} from "../models/address.model";

export class AddressDto {
    street1: string;
    street2: string;
    town: string;
    country: string;
    contactId: number;
    id: number;

    constructor(addressModel?: AddressModel) {
        if (addressModel) {
            this.street1 = addressModel.street1;
            this.street2 = addressModel.street2;
            this.town = addressModel.town;
            if (addressModel.contactId) {
                this.contactId = addressModel.contactId;
            } else if (addressModel.contact) {
                this.contactId = addressModel.contact.id;
            }

            if (addressModel.countryModel) {
                this.country = addressModel.countryModel.iso2;
            } else if (addressModel.country) {
                this.country = addressModel.country;
            }
            this.id = addressModel.id;
        }
    }

}