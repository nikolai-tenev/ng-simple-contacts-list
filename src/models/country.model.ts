import {CountryDto} from "../dtos/country.dto";

export class CountryModel {
    iso2: string;
    name: string;

    constructor(countryDto?: CountryDto) {
        if (countryDto) {
            this.iso2 = countryDto.iso2;
            this.name = countryDto.name;
        }
    }
}