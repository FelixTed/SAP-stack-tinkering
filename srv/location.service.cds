service LocationService {

    entity City {
        key name      : String;
        country       : String; 
    };

    function searchCities(q:String) returns array of City;

}