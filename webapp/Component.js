/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zappfreestyle/parceiros/model/models",
	"sap/ui/model/json/JSONModel"
    ],
    function (UIComponent,
	Device,
	models,
	JSONModel) {
        "use strict";

        return UIComponent.extend("zappfreestyle.parceiros.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                let oModel = new JSONModel();

                this.setModel(oModel, "layout");

                // enable routing
                this.getRouter().initialize();

                this.getRouter().attachBeforeRouteMatched(this.aoExecutarRota, this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            aoExecutarRota: function (oEvent) {
                // Obtem layout definido na função init
                let oLayout = this.getModel("layout");

                let sRota = oEvent.getParameter("name");
                // Altera layout do App.view.xml de acordo com a rota
                if (sRota === "RouteParceiro") {
                    oLayout.setProperty("/visual", sap.f.LayoutType.TwoColumnsMidExpanded)
                } else {
                    oLayout.setProperty("/visual", sap.f.LayoutType.OneColumn)
                }
            }
        });
    }
);