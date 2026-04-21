sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"], function (BaseController, MessageBox, JSONModel) {
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
			const oDraft = oDraftModel.getData();

			oItemsModel.bindList("/Item").create({
				name: oDraft.name,
				quantity: Number(oDraft.quantity) || 0,
				category: oDraft.category,
				location: oDraft.location,
				note: oDraft.note,
				url: oDraft.url
			});

			await oItemsModel.submitBatch("$auto");

			oDraftModel.setData({
				name: "",
				quantity: 0,
				category: "Tool",
				location: "",
				note: "",
				url: ""
			});

			MessageBox.success("Item created");
		}
	});
});
