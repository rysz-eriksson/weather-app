export default interface LangBase {
    ctrl: {
        searchPlac: string,
        searchButton: string
    };
    location: {
        latText: string,
        longText: string
    };
    weather: {
        feelsLike: string,
        wind: string,
        humidity: string
    };
}