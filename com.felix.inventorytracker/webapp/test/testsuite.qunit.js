sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.felix.inventoryTracker",
		defaults: {
			page: "ui5://test-resources/com/felix/inventoryTracker/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "com/felix/inventoryTracker/",
				never: "test-resources/com/felix/inventoryTracker/"
			},
			loader: {
				paths: {
					"com/felix/inventoryTracker": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.felix.inventoryTracker"
			},
			"integration/opaTests": {
				title: "Integration tests for com.felix.inventoryTracker"
			}
		}
	};
});
