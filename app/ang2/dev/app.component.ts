import {Component} from 'angular2/core';
import {LoginComponent} from "./login.component";

@Component({
    selector: 'my-app',
    template: `
        <login></login>
    `,
    directives : [LoginComponent]
})
export class AppComponent {

}