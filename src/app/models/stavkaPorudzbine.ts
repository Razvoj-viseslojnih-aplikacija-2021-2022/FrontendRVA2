import { Artikl } from "./artikl";
import { Porudzbina } from "./porudzbina";

export class StavkaPorudzbine {
    id!:number;
    redniBroj!: number;
    kolicina!:number;
    jedinicaMere!:string;
    cena!:number;
    porudzbina!: Porudzbina;
    artikl!: Artikl;
}