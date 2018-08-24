import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) { }

    getCrimes() {
        return this._http.get("/crimes");
    }

    filterCrimes(searchParams) {
        return this._http.post("/crimes", searchParams);
    }

    reportCrime(crime) {
        return this._http.post("/reportCrime", crime);
    }

    getCrimesCount(searchParams){
        return this._http.post('/crimes/count', searchParams);
    }
}
