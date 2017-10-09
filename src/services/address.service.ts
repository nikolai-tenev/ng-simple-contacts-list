import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AddressModel} from "../models/address.model";
import {AddressDto} from "../dtos/address.dto";

@Injectable()
export class AddressService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private addressesUrl = 'http://localhost:3000/addresses';

    constructor(private http: Http) {
    }

    getAddresses = (): Promise<AddressModel[]> => {
        return this.http.get(this.addressesUrl)
            .toPromise()
            .then(response => {
                let dtos = response.json() as AddressDto[];

                return dtos.map(addressDto => {
                    return new AddressModel(addressDto);
                });
            })
            .catch(this.handleError);
    };

    getAddressesByContactId = (contactId: number): Promise<AddressModel[]> => {
        return this.http.get(`${this.addressesUrl}?contactId=${contactId}`)
            .toPromise()
            .then(response => {
                let dtos = response.json() as AddressDto[];

                return dtos.map(addressDto => {
                    return new AddressModel(addressDto);
                });
            })
            .catch(this.handleError);
    };

    getAddress = (id: number): Promise<AddressModel> => {
        const url = `${this.addressesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let dto = response.json() as AddressDto;
                return new AddressModel(dto);
            })
            .catch(this.handleError);
    };

    delete = (id: number): Promise<void> => {
        const url = `${this.addressesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    };

    create = (addressModel: AddressModel): Promise<AddressModel> => {

        return this.http
            .post(this.addressesUrl, JSON.stringify(new AddressDto(addressModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as AddressDto;
                return new AddressModel(dto);
            })
            .catch(this.handleError);
    };

    update = (addressModel: AddressModel): Promise<AddressModel> => {
        const url = `${this.addressesUrl}/${addressModel.id}`;
        return this.http
            .put(url, JSON.stringify(new AddressDto(addressModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as AddressDto;
                return new AddressModel(dto);
            })
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}