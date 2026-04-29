import { IItem } from "../interfaces/Item";

sap.ui.define(
	[
		"./BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "../model/ItemValidator","sap/ui/core/Messaging"
	],
	function(BaseController, JSONModel, MessageBox, ItemValidator, Messaging) {
		return BaseController.extend("com.felix.inventoryTracker.controller.Form", {
			onInit(){
				Messaging.registerObject(this.getView(), true);
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

				const messages = Messaging.getMessageModel().getData();
				if (messages.length) {
					const message = messages[0];
					switch(message.type) {
						case "Error":
							MessageBox.error(message.message);
							break;
						case "Warning":
							MessageBox.warning(message.message);
							break;
						case "Success":
							MessageBox.success(message.message);
							break;
						case "Information":
							MessageBox.information(message.message);
							break;
						default:
							MessageBox.information(message.message);
					}
				}

				oDraftModel.setData({
					name: "",
					quantity: 0,
					category: "Tool",
					location: "",
					note: "",
					url: ""
				});
				oItemsModel.refresh();

			},
			onBack(){
				this.getRouter().navTo("main");
			}
		})
	}
)
