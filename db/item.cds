namespace catalogue;

type Category : String enum { Tool; Part; Electronics; }

entity Item {
    key id : UUID;
    name : String;
    quantity : Integer;
    category : Category;
    location : String;
    note : String;
    url : String;
}

