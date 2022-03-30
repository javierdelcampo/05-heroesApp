export interface Heroe {
    id?:              string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string; 
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
    EdicionesB = "Ediciones B",
    Bruguera = "Bruguera",
    Antena3 = "Antena 3",
    Dinamic = "Dinamic",
    Ninguno = ""
}