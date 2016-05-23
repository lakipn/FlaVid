///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {HttpService} from "./services/http.service";
import {LoggingService} from "./services/Logging.service";

bootstrap(AppComponent, [LoggingService, HttpService, HTTP_PROVIDERS]);