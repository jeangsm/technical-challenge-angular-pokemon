import { NamedAPIResource } from "./NamedAPIResource";

export interface PokemonListResponse {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResource[]
}