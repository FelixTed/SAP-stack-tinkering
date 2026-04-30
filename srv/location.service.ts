import { Request } from "@sap/cds";
import { City } from "#cds-models/LocationService";

const cds = require('@sap/cds');

class LocationService extends cds.ApplicationService{
    init(){

        this.on('searchCities', this.getLocations);
    
        return super.init();
    }

    async getLocations(req: Request){
        const q = req.data.q;

        if (!q || q.length < 2) return [];

        const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(q)}&maxRows=10&username=YOUR_USERNAME`;

        const response = await fetch(url);
        const data = await response.json();

        if(!data.geonames)
            return [];

        return data.geonames.map((city: City) => ({
            name: city.name,
            country: city.country
        }));
    }
}

module.exports = LocationService;