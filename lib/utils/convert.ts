import { pokemonType } from "../data/dataEnum"

export const convertColor = (name: string) => {
    return pokemonType[name as keyof typeof pokemonType]
}

export const convertId = (id: number) => {
    return `#${id.toString().padStart(3, '0')}`;
}

export const convertDecimal = (number:number) => {
    return (number * 0.1).toFixed(1);
}