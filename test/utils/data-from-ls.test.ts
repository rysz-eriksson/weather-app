import {getLangFromLS, getUnitFromLS, getCoordsFromLS} from '../../src/utils/data-from-ls';

describe('validates util func fetching data from LocalStorage', () => {
    describe('testing lang data fetch', () => {
        it('validated default result returned once no data in LS', () => {
            const result = getLangFromLS()
            expect(result).toBe('en')
        });
        it('validates extraction of proper result from LS', () => {
            localStorage.setItem('lang', 'pl')
            const result = getLangFromLS()
            expect(result).toBe('pl')
            localStorage.removeItem('lang')
        })
    });
    describe('testing unit data fetch', () => {
        it('validated default result returned once no data in LS', () => {
            const result = getUnitFromLS()
            expect(result).toBe('celcius')
        });
        it('validates extraction of proper result from LS', () => {
            localStorage.setItem('unit', 'farenheit')
            const result = getUnitFromLS()
            expect(result).toBe('farenheit')
            localStorage.removeItem('unit')
        });
    });
    describe('validates extraction from "coords" LS object', () => {
        it('function returns proper parsed object from LS', () => {
            const object = {
                latitude: 50.0619474,
                longitude: 19.9368564
            }
            localStorage.setItem('coords', JSON.stringify(object))
            const result = getCoordsFromLS();
            expect(result).toEqual(object);
            localStorage.removeItem('coords');
        })
    })
});