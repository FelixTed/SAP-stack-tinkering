import Filter from "sap/ui/model/Filter";
import BaseController from "./BaseController";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageBox from "sap/m/MessageBox";

export default class MainController extends BaseController {
	onInit(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.getRoute("main").attachPatternMatched(this._onRouteMatched, this);
	}

	_onRouteMatched(): void {
			const oList = this.byId("yourTableId"); // your table ID
			const oBinding = oList.getBinding("items");

			if (oBinding) {
				oBinding.refresh();
		}
	}

	onCreate(): void {
		this.getRouter().navTo("new-item");
	}

	onFilterPosts(oEvent: Event) {
		// build filter array
		var aFilter = [];
		var sQuery = oEvent.getParameter("query");
		if (sQuery) {
			aFilter.push(new Filter({
				path: "name",
				operator: FilterOperator.Contains,
				value1: sQuery,
				caseSensitive: false
			}));
		}

		// filter binding
		var oTable = this.byId("itemsTable");
		var oBinding = oTable.getBinding("items");
		oBinding.filter(aFilter);
	}

	onItemPress(oEvent: Event){
		const oItem = oEvent.getParameter("listItem");
		const oContext = oItem?.getBindingContext("items");
		const id = oContext.getObject()?.id;

		if(!id){
			MessageBox.warning("Item does not exist");
			return;
		}
		this.getRouter().navTo("item", {id: id});


	}
}
