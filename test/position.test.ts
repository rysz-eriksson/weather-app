import * as posFunc from '../src/position';
import ReturnedCity from '../src/models/returnedCity'


describe('validates functions in position.ts file', () => {
    const data = {
        city: 'katowice',
        country: 'Poland',
        latitude: 50.2598987,
        longitude: 19.0215852
    }
    const city = 'katowice'
    describe('getCoords()', () => {

        it('tests if getSearchedCity() is called if city in the arg', async (done) => {
            const spiedCity = spyOn(posFunc, 'getSearchedCity').and.returnValue(Promise.resolve(data))

            
            await posFunc.getCoords(city)
            const { latitude, longitude } = JSON.parse(localStorage.getItem('coords')!)
            expect(latitude).toEqual(data.latitude)
            expect(longitude).toEqual(data.longitude)
            expect(spiedCity).toHaveBeenCalledWith(city); 
            done();
        })
        it('tests if gets proper data from navigator API', () => {
            spyOn(navigator.geolocation, 'getCurrentPosition').and.returnValue
            posFunc.getCoords()
            expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
        })
    })
})