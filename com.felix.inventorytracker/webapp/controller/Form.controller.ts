import MessageBox from "sap/m/MessageBox";
import SelectDialog from "sap/m/SelectDialog";
import StandardListItem from "sap/m/StandardListItem";
import type Event from "sap/ui/base/Event";
import Messaging from "sap/ui/core/Messaging";
import JSONModel from "sap/ui/model/json/JSONModel";
import type ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import BaseController from "./BaseController";
import ItemValidator from "../model/ItemValidator";
import type { IItem } from "../interfaces/Item";

export default class FormController extends BaseController {
	onInit(): void {
		Messaging.registerObject(this.getView(), true);
		this.getView().setModel(new JSONModel({
			name: "",
			quantity: 0,
			category: "Tool",
			location: "",
			note: "",
			url: ""
		}), "draft");

		this.getView().setModel(new JSONModel([]), "cities");
	}

	async onSubmit(): Promise<void> {
		const oItemsModel = this.getOwnerComponent().getModel("items") as ODataModel;
		const oDraftModel = this.getView().getModel("draft") as JSONModel;
		const oErrorModel = this.getView().getModel("itemUIErrors") as JSONModel;
		const oBundle = await (this.getView().getModel("i18n") as ResourceModel).getResourceBundle();
		const oDraft = oDraftModel.getData() as IItem;

		const error = ItemValidator.validateItem(oDraft, oBundle, oErrorModel);
		if (error) {
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

		const messages = Messaging.getMessageModel().getData() as Array<{ type: string; message: string }>;
		if (messages.length) {
			const message = messages[0];
			switch (message.type) {
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
	}

	onBack(): void {
		this.getRouter().navTo("main");
	}

	onValueHelpRequest(): void {
		const dialog = this.byId("cityValueHelp") as SelectDialog;
		dialog.open();
	}

	onValueHelpCancel(): void {
		const dialog = this.byId("cityValueHelp") as SelectDialog;
		dialog.close();
	}

	onCityConfirm(oEvent: Event): void {
		const selectedItem = oEvent.getParameter("selectedItem") as StandardListItem | null;
		if (!selectedItem) {
			return;
		}
		const oDraftModel = this.getView().getModel("draft") as JSONModel;
		oDraftModel.setProperty("/location", selectedItem.getTitle());
	}

	async onSearch(oEvent: Event): Promise<void> {
		const query = oEvent.getParameter("value") as string;

		if (!query || query.length < 2) {
			return;
		}

		const oModel = this.getOwnerComponent().getModel("locations") as ODataModel;

		const result = await oModel.bindContext(
			`/searchCities(q='${query}')`
		).requestObject();

		const citiesModel = this.getView().getModel("cities") as JSONModel;
		citiesModel.setData(result.value);
	}
}
