import {renderTempText} from '../src/renderWeatherUnit'

describe('validates renderWeatherUnit component', () => {
    describe('validates renderTempText function', () => {
        it('validates returning proper text for celcius temp', () => {
            const result = renderTempText(10.6, 'celcius')
            expect(result).toBe('11°C')
        });
        it('validates proper calculation to farenheit and text return', () => {
            const result = renderTempText(10.6, 'farenheit')
            expect(result).toBe('51°F')
        });
    });
});