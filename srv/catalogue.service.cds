using { catalogue } from '../db/item';

service CatalogueService {
    entity Item as projection on catalogue.Item;
}