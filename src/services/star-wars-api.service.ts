import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Ifilm } from '../interfaces/IFilm';
import { Istarship } from '../interfaces/IStarShip';
import { Ivehicle } from '../interfaces/IVehicle';
import { Ipeople } from '../interfaces/Ipeople';
 


interface IstarWarsService<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

@Injectable()
export class StarWarsService {

    private urlBase: string = 'https://swapi.co/api';

    constructor(private http: HttpClient) { 
        
    }
 

    getFilms(url: string): Observable<IstarWarsService<Ifilm>> {
        return this.http.get<IstarWarsService<Ifilm>>(url);
    }

    getStarships(url: string): Observable<IstarWarsService<Istarship>>{
        return this.http.get<IstarWarsService<Istarship>>(url);
    }

    getVehicles(url: string): Observable<IstarWarsService<Ivehicle>>{
        return this.http.get<IstarWarsService<Ivehicle>>(url);
    }

    getCharacterByUrl(url: string): Observable<Ipeople>{
        return this.http.get<Ipeople>(url);
    }
 
}