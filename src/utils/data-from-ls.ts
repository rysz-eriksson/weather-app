import { lang, unit } from '../models/lang-unit';
import Coords from '../models/coords';

const getDataFromLocalSt = <T>(item: string, byDefault: T, ): T => {

    const value: T = localStorage.getItem(item) ? (localStorage.getItem(item)! as unknown as T) : byDefault;
    return value
}

export const getLangFromLS = () => {
    return getDataFromLocalSt<lang>('lang', 'en')
}

export const getUnitFromLS = () => {
    return getDataFromLocalSt<unit>('unit', 'celcius')
}

export const getCoordsFromLS = () => {
    const position: Coords = JSON.parse(localStorage.getItem('coords')!);
    return position
}
