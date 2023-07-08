sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("zappfreestyle.parceiros.controller.Parceiro", {
		onInit: function() {
			let oRoteador = this.getOwnerComponent().getRouter();
			let oRotaDesejada = oRoteador.getRoute("RouteParceiro");

			oRotaDesejada.attachPatternMatched(this.rotaDetalhe, this);
		
		},
		rotaDetalhe: function(oEvent) {
			let sCodigoParceiro = oEvent.getParameters("arguments").arguments.CodigoParceiro;

			let oModel = this.getOwnerComponent().getModel();

			let sCaminho = oModel.createKey("/ParceirosSet", {
				CodigoParceiro: sCodigoParceiro
			});

			this.getView().bindElement(sCaminho);
		}
	});
});