import BaseController from "./BaseController";

export default class App extends BaseController {
	onInit(): void {
		const component = this.getOwnerComponent() as { getContentDensityClass: () => string };
		this.getView().addStyleClass(component.getContentDensityClass());
	}
}
