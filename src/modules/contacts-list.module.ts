import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {DefaultContainerComponent} from '../components/default-container/default-container.component';
import {ContactsListRoutingModule} from "./contacts-list-routing.module";
import {FormsModule} from "@angular/forms";
import {ContactDetailsPageComponent} from "../components/contact-details-page/contact-details-page.component";
import {ContactsPageComponent} from "../components/contacts-page/contacts-page.component";
import {HomePageComponent} from "../components/home-page/home-page.component";
import {ContactService} from "../services/contact.service";
import {HttpModule} from "@angular/http";
import {AddressService} from "../services/address.service";
import {CountryService} from "../services/country.service";
import {CountriesListComponent} from "../components/contact-details-page/countries-list.component";

@NgModule({
    declarations: [
        DefaultContainerComponent,
        ContactDetailsPageComponent,
        ContactsPageComponent,
        HomePageComponent,
        CountriesListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ContactsListRoutingModule
    ],
    providers: [ContactService, AddressService, CountryService],
    bootstrap: [DefaultContainerComponent]
})
export class ContactListModule {
}
