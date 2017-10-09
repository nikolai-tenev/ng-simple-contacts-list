import {AddressDto} from "../dtos/address.dto";
import {ContactModel} from "./contact.model";
import {CountryModel} from "./country.model";

export class AddressModel {
    id?: number;
    street1?: string;
    street2?: string;
    town?: string;
    countryModel?: CountryModel;
    country?: string;
    contact?: ContactModel;
    contactId?: number;

    constructor(addressDto?: AddressDto) {
        if (addressDto) {
            this.id = addressDto.id;
            this.street1 = addressDto.street1;
            this.street2 = addressDto.street2;
            this.town = addressDto.town;
            this.country = addressDto.country;
            this.contactId = addressDto.contactId;
        }
    }
}