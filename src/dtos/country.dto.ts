import {CountryModel} from "../models/country.model";

export class CountryDto {
    iso2: string;
    name: string;

    constructor(countryModel?: CountryModel) {
        if (countryModel) {
            this.iso2 = countryModel.iso2;
            this.name = countryModel.name;
        }
    }
}