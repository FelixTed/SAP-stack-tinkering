import { IItem } from "../interfaces/Item";

sap.ui.define([
	"./BaseController",
	"sap/ui/core/Messaging",
	"sap/m/MessageBox"
], function (BaseController, Messaging, MessageBox) {
	"use strict";

	return BaseController.extend("com.felix.inventoryTracker.controller.Main", {

		onInit: function () {
			console.log("HELLLLO");
			Messaging.registerObject(this.getView(), true);
		},

		onCreate(){
			this.getRouter().navTo("new-item");
		}

	});
});
