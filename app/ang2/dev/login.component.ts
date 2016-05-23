/**
 * Created by lazar on 5/8/16.
 */
import {Component} from 'angular2/core';
import {ControlGroup} from "angular2/common";
import {OnInit} from "angular2/core";
import {LoggingService} from "./services/Logging.service";
import {document} from "angular2/src/facade/browser";
import {OnChanges} from "angular2/core";

@Component({
    selector : 'login',
    templateUrl : 'templates/login.html'
})
export class LoginComponent implements OnInit, OnChanges {
    ngOnChanges(changes:{}):any {
        console.log(changes);
    }

    izlaz : Array<any>;
    maxDate = Date.now();
    registred : any;
    reso : Object;
    public res : any;

    ngOnInit():any {
        this.registred = false;
    }

    constructor( private _loggingService : LoggingService){}

    checkLogin(username : string, password : string)
    {
        this._loggingService.loginObj = this;
        this.izlaz = this._loggingService.checkLogin(username, password);
        //alert((this._loggingService.checkLogin(username, password)) ? "Uspesno!" : "Neuspesno!");
    }

    onLogin(form)
    {
        let
            username = form.value['username'],
            password = form.value['password'];


        /*this.dsadd = new Promise( (resolve, reject) => {
            setTimeout(() => (this.reso = this._loggingService.checkLogin(username, password)), 2000);
        } );*/
        this._loggingService.checkLogin(username, password);
        alert("Successfully logged in!");
        //let result = this._loggingService.checkLogin(username, password);
    }

    onSubmit(form)
    {
        let
            username = form.value['username'],
            password = form.value['password'],
            email = form.value['email'],
            birthday = form.value['birthday'],
            gender = form.value['gender'],
            relationshipStatus = form.value['relationshipStatus'],
            interestedIn = form.value['interestedIn'];

        console.log(this._loggingService.registerUser(username, password, email, birthday, gender, relationshipStatus, interestedIn));
        this.registred = true;
    }

    isValid()
    {
        let count = document.getElementsByClassName('validation-error').length;
        //console.log('Count: ', count);
        return count == 0;
    }
}