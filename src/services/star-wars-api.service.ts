import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
 

export interface Ifilm {
	title: string;
    episode_id: string;
	opening_crawl: string;
	director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface Ipeople {
	name: string;
    height: string;
	mass: string;
	hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface Istarship {
	name: string;
    model: string;
	manufacturer: string;
	cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface Ivehicle {
	name: string;
    model: string;
	manufacturer: string;
	cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

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
 

    getFilms(page:number): Observable<IstarWarsService<Ifilm>> {
        return this.http.get<IstarWarsService<Ifilm>>(`${this.urlBase}/films/?page=${page}`);
    }

    getStarships(page:number) {
        return this.http.get<IstarWarsService<Istarship>>(`${this.urlBase}/starships/?page=${page}`);
    }

    getVehicles(page:number) {
        return this.http.get<IstarWarsService<Ivehicle>>(`${this.urlBase}/vehicles/?page=${page}`);
    }

    getCharacterByUrl(url: string) {
        return this.http.get<Ipeople>(url);
    }
 
}