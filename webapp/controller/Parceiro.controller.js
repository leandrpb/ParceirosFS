sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(
	Controller,
	JSONModel
) {
	"use strict";

	return Controller.extend("zappfreestyle.parceiros.controller.Parceiro", {
		onInit: function() {
			let oRoteador = this.getOwnerComponent().getRouter();
			let oRotaDesejada = oRoteador.getRoute("RouteParceiro");

			oRotaDesejada.attachPatternMatched(this.rotaDetalhe, this);
			
			let oModel = new JSONModel();
			oModel.setProperty("/habilitado", false);
			this.getView().setModel(oModel, "editavel");
		},
		rotaDetalhe: function(oEvent) {
			let sCodigoParceiro = oEvent.getParameters("arguments").arguments.CodigoParceiro;

			let oModel = this.getOwnerComponent().getModel();

			let sCaminho = oModel.createKey("/ParceirosSet", {
				CodigoParceiro: sCodigoParceiro
			});

			this.getView().bindElement(sCaminho);
		},
		onButtonEdit: function(oEvent) {
			this._ConfiguraEdicao(true)
		},
		_ConfiguraEdicao: function(bHabilitaEdicao) {
			let oModelEditavel = this.getView().getModel("editavel");

			oModelEditavel.setProperty("/habilitado", bHabilitaEdicao)
		}
	});
});