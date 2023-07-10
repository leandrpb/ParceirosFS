sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
], function(
	Controller,
	JSONModel,
	MessageToast
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
			
			this.getOwnerComponent().getModel().setDefaultBindingMode('TwoWay');
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
			this._ConfiguraEdicao(true);
		},
		onButtonCancel: function(oEvent) {
			this.getOwnerComponent().getModel().resetChanges();

			this._ConfiguraEdicao(false);
		},
		onButtonSave: function(oEvent) {
			let sCaminho = this.getView().getBindingContext().sPath;
			let oDadosTela = this.getView().getBindingContext().getObject();
			let oModel = this.getOwnerComponent().getModel();

			let oInformacoesUpdate = {
				CodigoParceiro: oDadosTela.CodigoParceiro,
				Tipo: oDadosTela.Tipo,
				Nome1: oDadosTela.Nome1,
				Nome2: oDadosTela.Nome2,
				TermoDePesquisa1: oDadosTela.TermoDePesquisa1,
				TermoDePesquisa2: oDadosTela.TermoDePesquisa2,
				Rua: oDadosTela.Rua,
				NumeroCasa: oDadosTela.NumeroCasa,
				Bairro: oDadosTela.Bairro,
				Cidade: oDadosTela.Cidade,
				Estado: oDadosTela.Estado,
				Pais: oDadosTela.Pais,
				CEP: oDadosTela.CEP
			};

			oModel.update(sCaminho, oInformacoesUpdate,{
				success: () => {
					MessageToast.show('Parceiro atualizado com sucesso!')
					this._ConfiguraEdicao(false);
				},
				error: (oError) => {
					MessageToast.show(JSON.parse(oError.responseText).error.message.value)
				}
			})
		},
		_ConfiguraEdicao: function(bHabilitaEdicao) {
			let oModelEditavel = this.getView().getModel("editavel");

			oModelEditavel.setProperty("/habilitado", bHabilitaEdicao);
		}
	});
});