const cds = require('@sap/cds');

class CatalogueService extends cds.ApplicationService{
    init(){
        const { Item } = this.entities;

        this.before(['CREATE', 'UPDATE'], Item, this.checkForLowQuantity);
    
        return super.init();
    }

    checkForLowQuantity(req){
        const data = req.data;
        
        if(data.quantity < 5){
            console.log("WHAT")
            req.warn({
                code: 'LOW_QUANTITY',
                message: 'Item quantity is already low',
                target: 'quantity'
            })
        }
    }
}

module.exports = CatalogueService;