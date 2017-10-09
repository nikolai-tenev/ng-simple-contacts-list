import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CountryModel} from "../../models/country.model";
import {CountryService} from "../../services/country.service";

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'countries-list',
    template: `
        <select id="country" class="browser-default" name="selectedCountry" [(ngModel)]="selectedCountry" (ngModelChange)="selectedCountryChange.emit($event)">
            <option value="" disabled selected>Choose your option</option>
            <option *ngFor="let country of countries" [value]="country.iso2">{{country.name}}</option>
        </select>
        <!--<label for="country">Country *</label>-->
    `
})
export class CountriesListComponent implements OnInit, AfterViewInit {
    countries: CountryModel[];

    @Input() selectedCountry:CountryModel;
    @Output() selectedCountryChange: EventEmitter<string> = new EventEmitter();

    constructor(private countryService: CountryService) {
    }

    ngOnInit(): void {
        this.countryService.getCountries().then((countries: CountryModel[]) => {
            this.countries = countries;

            //follows the most idiotic hack i've ever done
            // setTimeout(() => {
            //     $('select').material_select();
            // }, 300);
        });
    }

    ngAfterViewInit(): void {
        $('select').material_select();
    }
}