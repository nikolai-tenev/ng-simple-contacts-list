import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ContactModel} from "../models/contact.model";
import {ContactDto} from "../dtos/contact.dto";

@Injectable()
export class ContactService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private contactsUrl = 'http://localhost:3000/contacts';

    constructor(private http: Http) {
    }

    getContacts = (): Promise<ContactModel[]> => {
        return this.http.get(this.contactsUrl)
            .toPromise()
            .then(response => {
                let dtos = response.json() as ContactDto[];

                return dtos.map(contactDto => {
                    return new ContactModel(contactDto);
                });
            })
            .catch(this.handleError);
    };


    getContact = (id: number): Promise<ContactModel> => {
        const url = `${this.contactsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let dto = response.json() as ContactDto;
                return new ContactModel(dto);
            })
            .catch(this.handleError);
    };

    delete = (id: number): Promise<void> => {
        const url = `${this.contactsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    };

    create = (contactModel: ContactModel): Promise<ContactModel> => {

        return this.http
            .post(this.contactsUrl, JSON.stringify(new ContactDto(contactModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as ContactDto;
                return new ContactModel(dto);
            })
            .catch(this.handleError);
    };

    update = (contactModel: ContactModel): Promise<ContactModel> => {
        const url = `${this.contactsUrl}/${contactModel.id}`;
        return this.http
            .put(url, JSON.stringify(new ContactDto(contactModel)), {headers: this.headers})
            .toPromise()
            .then(response => {
                let dto = response.json() as ContactDto;
                return new ContactModel(dto);
            })
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}