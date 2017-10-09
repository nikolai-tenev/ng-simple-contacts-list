import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CountryModel} from "../models/country.model";
import {CountryDto} from "../dtos/country.dto";

@Injectable()
export class CountryService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private countriesUrl = 'http://localhost:3000/countries';

    constructor(private http: Http) {
    }

    getCountries(): Promise<CountryModel[]> {
        return this.http.get(this.countriesUrl)
            .toPromise()
            .then(response => {
                let dtos = response.json() as CountryDto[];

                return dtos.map(countryDto => {
                    return new CountryModel(countryDto);
                });
            })
            .catch(this.handleError);
    }


    getCountry(iso2: string): Promise<CountryModel> {
        const url = `${this.countriesUrl}/${iso2}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let dto = response.json() as CountryDto;
                return new CountryModel(dto);
            })
            .catch(this.handleError);
    }

    delete(iso2: string): Promise<void> {
        const url = `${this.countriesUrl}/${iso2}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(countryModel: CountryModel): Promise<CountryModel> {

        return this.http
            .post(this.countriesUrl, JSON.stringify(new CountryDto(countryModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as CountryDto;
                return new CountryModel(dto);
            })
            .catch(this.handleError);
    }

    update(countryModel: CountryModel): Promise<CountryModel> {
        const url = `${this.countriesUrl}/${countryModel.iso2}`;
        return this.http
            .put(url, JSON.stringify(new CountryDto(countryModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as CountryDto;
                return new CountryModel(dto);
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}