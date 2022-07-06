type Sprites = {
    back_default:       string;
    back_female:        string
    back_shiny:         string;
    back_shiny_female:  string
    front_default:      string;
    front_female:       string
    front_shiny:        string;
    front_shiny_female: string
}


type Type = {
    name:   string;
    url:    string
}

type Types = {
    slot:   number;
    type:   Type;
}

export interface Pokemon {
    id:                 number;
    name:               string;
    base_experience:    number;
    height:             number;
    is_default:         boolean;
    order:              number;
    weight:             number;
    sprites:            Sprites;
    types:              Types[];
}