import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {URLSearchParams} from "angular2/http";

@Injectable()
export class HttpService {

    constructor( private _http : Http ) {}

    checkUser(username : string, password : string) : Observable<any> {
        let params : URLSearchParams = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);

        return this._http.get('http://127.0.0.1:1337/user/checkLogin', {
            search : params
        }).map( res => res.json() );
    }

    /*createCompleteUser( user : { firstName : string, lastName : string, username : string, password : string, email : string,
                        profilePictureUrl : string, coverPictureUrl : string, birthday : Date,  gender : string,
                        relationshipStatus : string, interestedIn : string, personalWebsite : string, hometown : string,
                        currentCity : string, country : string, workOccupation : string, workCompany : string,
                        educationSchool : string, aboutMe : string, interestsAndHobbies : string,
                        favoriteMoviesAndTvShows : string, favoriteMusic : string, favoriteBooks : string } ) {
        const body = JSON.stringify(user);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-urlencoded');
        return this._http.post('http://127.0.0.1/1337/user/', body, {
            headers : headers;
        }).map(res => res.json());
    }*/

    createUser( user : { username : string, password : string, email : string, birthday : Date,  gender : string,
                        relationshipStatus : string, interestedIn : string } ) {
        const body = JSON.stringify(user);
        let headers = new Headers();
        headers.append('Content-Type', 'x-www-urlencoded');
        return this._http.post(
            'http://127.0.0.1:1337/user/',
            body/*,
            {
                headers : headers
            }*/
        ).map(res => res.json());
    }
}