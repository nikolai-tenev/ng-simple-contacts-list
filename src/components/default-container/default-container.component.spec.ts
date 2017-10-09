import {async, TestBed} from '@angular/core/testing';
import {DefaultContainerComponent} from './default-container.component';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ContactsListRoutingModule} from "../../modules/contacts-list-routing.module";
import {CountryService} from "../../services/country.service";
import {AddressService} from "../../services/address.service";
import {ContactService} from "../../services/contact.service";
import {CountriesListComponent} from "../contact-details-page/countries-list.component";
import {HomePageComponent} from "../home-page/home-page.component";
import {ContactsPageComponent} from "../contacts-page/contacts-page.component";
import {ContactDetailsPageComponent} from "../contact-details-page/contact-details-page.component";
import {APP_BASE_HREF} from "@angular/common";

describe('DefaultContainerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            providers: [ContactService, AddressService, CountryService, {provide: APP_BASE_HREF, useValue: '/'}],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(DefaultContainerComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(DefaultContainerComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('nav > .nav-wrapper li:nth-child(2)').textContent).toContain('Contact List App');
    }));
});
