import { Ipeople } from "./Ipeople";

export interface Ifilm {
	title: string;
    episode_id: string;
	opening_crawl: string;
	director: string;
    producer: string;
    release_date: string;
    created: string;
    edited: string;
    url: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    peoples: Ipeople[];
}
