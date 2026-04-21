import I18NText from "sap/ui/test/matchers/I18NText";
import { IItem } from "../interfaces/Item"
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import JSONModel from "sap/ui/model/json/JSONModel";

sap.ui.define([], function(){
	return {
		validateItem: function(item: IItem, oBundle: ResourceBundle, oErrorModel: JSONModel) {
			let error = false;

			oErrorModel.setData({
				name: "",
				quantity: "",
				category: "",
				location: "",
				note: "",
				url: ""
			});
			if(item.name.length < 3){
				const nameError = oBundle.getText("ItemErrorNameLength");
				oErrorModel.setProperty("/name", nameError);
				error = true;
			}

			if(item.quantity <= 0){
				const quantityError = oBundle.getText("ItemErrorQuantity");
				oErrorModel.setProperty("/quantity", quantityError);
				error = true;
			}

			if(!item.category ){
				const emptyError = oBundle.getText("ItemErrorEmptyField");
				oErrorModel.setProperty("/category", emptyError);
				error = true;
			}

			if(!item.url ){
				const emptyError = oBundle.getText("ItemErrorEmptyField");
				oErrorModel.setProperty("/url", emptyError);
				error = true;
			}

			return error;
		}
	}
})
