import type ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import type Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import UIComponent from "sap/ui/core/UIComponent";
import type Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

const BaseController = Controller.extend("com.felix.inventoryTracker.controller.BaseController", {
	/**
	 * Convenience method to get the components' router instance.
	 * @returns {sap.m.routing.Router} The router instance
	 */
	getRouter(): Router {
		return UIComponent.getRouterFor(this);
	},

	/**
	 * Convenience method for getting the i18n resource bundle of the component.
	 * @returns {sap.base.i18n.ResourceBundle} The i18n resource bundle of the component
	 */
	getResourceBundle(): ResourceBundle {
		const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
		return oModel.getResourceBundle();
	},

	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 * @param {string} [sName] The model name
	 * @returns {sap.ui.model.Model} The model instance
	 */
	getModel(sName?: string): Model | undefined {
		return this.getView().getModel(sName);
	},

	/**
	 * Convenience method for setting the view model in every controller of the application.
	 * @param {sap.ui.model.Model} oModel The model instance
	 * @param {string} [sName] The model name
	 * @returns {sap.ui.core.mvc.Controller} The current base controller instance
	 */
	setModel(oModel: Model, sName?: string): this {
		this.getView().setModel(oModel, sName);
		return this;
	},

	/**
	 * Convenience method for triggering the navigation to a specific target.
	 * @public
	 * @param {string} sName Target name
	 * @param {object} [oParameters] Navigation parameters
	 * @param {boolean} [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
	 */
	navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
		this.getRouter().navTo(sName, oParameters, undefined, bReplace);
	},

	/**
	 * Convenience event handler for navigating back.
	 * It there is a history entry we go one step back in the browser history
	 * If not, it will replace the current entry of the browser history with the main route.
	 */
	onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			this.getRouter().navTo("main", {}, undefined, true);
		}
	}
});

export default BaseController;
