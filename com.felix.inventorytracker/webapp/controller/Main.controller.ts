import { IItem } from "../interfaces/Item";

sap.ui.define([
	"./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel",
	"../model/ItemValidator"
], function (BaseController, MessageBox, JSONModel, ItemValidator) {
	"use strict";

	return BaseController.extend("com.felix.inventoryTracker.controller.Main", {
		onInit: function () {
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
		}
	});
});
