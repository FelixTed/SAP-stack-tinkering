import Filter from "sap/ui/model/Filter";
import BaseController from "./BaseController";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageBox from "sap/m/MessageBox";

export default class ItemController extends BaseController {
	onInit(): void {
		var oRouter = this.getOwnerComponent().getRouter();
		console.log('hello');
  		oRouter.getRoute("item").attachPatternMatched(this._onObjectMatched, this);
	}

	_onObjectMatched(oEvent: Event):void {
		const sId = oEvent.getParameter("arguments").id;

		console.log("ID:", sId); // check if this prints

		this.getView().bindElement({
			path: `items>/Item('${sId}')`
		});
	}

	onDelete(): void {
  const oContext = this.getView().getBindingContext("items");

  if (!oContext) {
    console.error("No binding context");
    return;
  }

  MessageBox.confirm("Are you sure you want to delete this item?", {
    actions: ["Delete", "Cancel"],
    onClose: async (sAction) => {
      if (sAction === "Delete") {
        try {
          await oContext.delete();

          MessageBox.success("Item deleted");

          this.getOwnerComponent().getRouter().navTo("main"); // adjust route name

        } catch (err) {
          MessageBox.error("Delete failed");
          console.error(err);
        }
      }
    }
  });
}
}
