window.Helper.Database.addIndex("CustomerRamseier_ErpDocumentArticleRelationship", ["ArticleId", "ErpDocumentId"]);
window.Helper.Database.registerTable("CustomerRamseier_ErpDocumentArticleRelationship", {
    Article: { type: "Crm.Offline.DatabaseModel.CrmArticle_Article", inverseProperty: "$$unbound", defaultValue: null, keys: ["ArticleId"] },
    ErpDocument: { type: "Crm.Offline.DatabaseModel.CustomerRamseier_CustomErpDocument", inverseProperty: "$$unbound", keys: ["ErpDocumentId"] }
});
window.Helper.Database.addIndex("CustomerRamseier_Turnover", ["ContactKey"]);
window.Helper.Database.registerTable("CustomerRamseier_Turnover", {
    Company: { type: "Crm.Offline.DatabaseModel.Main_Company", inverseProperty: "$$unbound", keys: ["ContactKey"] }
});
window.Helper.Database.addIndex("CustomerRamseier_TurnoverArticleGroup", ["ContactKey"]);
window.Helper.Database.registerTable("CustomerRamseier_TurnoverArticleGroup", {
    Company: { type: "Crm.Offline.DatabaseModel.Main_Company", inverseProperty: "$$unbound", keys: ["ContactKey"] }
});