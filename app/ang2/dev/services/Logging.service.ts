import {Injectable} from "angular2/core";
import {HttpService} from "./http.service";
import {Http} from "angular2/http";
import {OnChanges} from "angular2/core";

@Injectable()
export class LoggingService {

    public loginObj = {};
    public _response : Object;

    constructor ( private _httpService : HttpService ) {}

    checkLogin(username : string, password : string)
    {
        this._httpService.checkUser(username, password)
            .subscribe(
                response => { this._response = response; this.loginObj.res = JSON.stringify(response); console.log(this._response); },
                error => console.log(error)
            );
    }

    registerUser( username : string, password : string, email : string, birthday : Date,  gender : string,
                  relationshipStatus : string, interestedIn : string ) {
        let user = {
            username : username,
            password : password,
            email : email,
            birthday : birthday,
            gender: gender,
            relationshipStatus : relationshipStatus,
            interestedIn : interestedIn
        };
        this._httpService.createUser(user)
            .subscribe(
                response => this._response = response,
                error => console.log(error)
            );
        return this._response;
    }

}