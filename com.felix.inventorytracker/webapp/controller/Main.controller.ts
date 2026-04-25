import { IItem } from "../interfaces/Item";

sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.felix.inventoryTracker.controller.Main", {

		onCreate(){
			this.getRouter().navTo("new-item");
		}

	});
});
