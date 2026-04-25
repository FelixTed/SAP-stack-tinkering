import { IItem } from "../interfaces/Item";

sap.ui.define(
	[
		"./BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "../model/ItemValidator"
	],
	function(BaseController, JSONModel, MessageBox, ItemValidator) {
		return BaseController.extend("com.felix.inventoryTracker.controller.Form", {
			onInit(){
				console.log("VIEW INIT")
				this.getView().setModel(new JSONModel({
					name: "",
					quantity: 0,
					category: "Tool",
					location: "",
					note: "",
					url: ""
				}), "draft");
			},
			onSubmit: async function () {
				const oItemsModel = this.getOwnerComponent().getModel("items");
				const oDraftModel = this.getView().getModel("draft");
				const oErrorModel = this.getView().getModel("itemUIErrors");
				const oBundle = await this.getView().getModel("i18n").getResourceBundle();
				const oDraft: IItem = oDraftModel.getData();

				const error = ItemValidator.validateItem(oDraft,oBundle,oErrorModel);
				if(error){
					return;
				}

				const createdContext = oItemsModel.bindList("/Item").create({
					name: oDraft.name,
					quantity: Number(oDraft.quantity) || 0,
					category: oDraft.category,
					location: oDraft.location,
					note: oDraft.note,
					url: oDraft.url
				});

				await oItemsModel.submitBatch("$auto");
				await createdContext.created();

				oDraftModel.setData({
					name: "",
					quantity: 0,
					category: "Tool",
					location: "",
					note: "",
					url: ""
				});
				oItemsModel.refresh();

				MessageBox.success("Item created");
			},
			onBack(){
				this.getRouter().navTo("main");
			}
		})
	}
)
