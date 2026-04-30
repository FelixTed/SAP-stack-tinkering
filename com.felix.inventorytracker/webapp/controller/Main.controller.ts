import BaseController from "./BaseController";

export default class MainController extends BaseController {
	onInit(): void {}

	onCreate(): void {
		this.getRouter().navTo("new-item");
	}
}
