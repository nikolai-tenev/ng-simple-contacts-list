import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "../components/home-page/home-page.component";
import {ContactsPageComponent} from "../components/contacts-page/contacts-page.component";
import {ContactDetailsPageComponent} from "../components/contact-details-page/contact-details-page.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'contacts', component: ContactsPageComponent},
    {path: 'contacts/new/:name', component: ContactDetailsPageComponent},
    {path: 'contacts/:id', component: ContactDetailsPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ContactsListRoutingModule {
}