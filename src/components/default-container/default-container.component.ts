import {AfterViewInit, Component} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
    selector: '.wrapper',
    templateUrl: './default-container.component.html',
    styleUrls: ['./default-container.component.css']
})
export class DefaultContainerComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        $("#show-side-nav").sideNav();
    }
}
