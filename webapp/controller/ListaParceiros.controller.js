sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/ButtonType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Dialog, DialogType, Text, Button, ButtonType) {
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
            },
            onButtonDeletarParceiro: function (oEvent){
                debugger;
                this.sCaminho = this.getView().byId("idTabela").getSelectedItem().getBindingContext().sPath;
            
                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Deletar Parceiro",
                        content: new Text({ text: "Tem certeza que deseja deletar o parceiro selecionado?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Sim",
                            press: function () {
                                let oModel = this.getOwnerComponent().getModel();

                                oModel.remove(this.sCaminho, {
                                    success: () => {
                                        MessageToast.show('Parceiro deletado com sucesso!');
                                    },
                                    error: (oError) => {
                                        MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                                    }
                                })
                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Não",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                }
    
                this.oApproveDialog.open();

                
            }
        });
    });
