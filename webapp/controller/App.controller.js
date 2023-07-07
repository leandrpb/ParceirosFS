sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("zappfreestyle.parceiros.controller.App", {
        onInit() {
          let oRoteador = this.getOwnerComponent().getRouter();

          oRoteador.navTo("RouteListaParceiros")
        }
      });
    }
  );
  