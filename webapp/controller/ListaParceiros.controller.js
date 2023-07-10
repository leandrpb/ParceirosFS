sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zappfreestyle.parceiros.controller.ListaParceiros", {
            onInit: function () {

            },
            aoClicarNoItem: function (oEvent) {
                //  Captura parceiro da linha selecionada
                let oColumnListItem = oEvent.getSource();

                let oContexto = oColumnListItem.getBindingContext();

                let oDadosModelo = oContexto.getObject();

                let sCodigoParceiro = oDadosModelo.CodigoParceiro;

                // Navegação pra segunda rota
                let oRoteador = this.getOwnerComponent().getRouter();

                oRoteador.navTo("RouteParceiro", {
                    CodigoParceiro: sCodigoParceiro
                })
            },
            onButtonCriarParceiro: function (oEvent) {
                let oRoteador = this.getOwnerComponent().getRouter();

                oRoteador.navTo("RouteParceiro", {
                    CodigoParceiro: "novo_parc"
                })
            }
        });
    });
