using { catalogue } from '../db/item';

service CatalogueService {
    entity Item @(restrict: [{
        grant: ['READ', 'WRITE'], to: 'user'
    }]) as projection on catalogue.Item;
}