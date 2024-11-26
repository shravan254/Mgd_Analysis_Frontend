/** @format */

// let API = "http://localhost:5001";
// let API = "http://172.16.20.61:5001";
// let API = "http://20.204.221.140:5001";
//let API = "http://20.204.144.125:3001";

let API = process.env.REACT_APP_API_KEY;

export const endpoints = {
	//customers
	MenuUrlsAPI: `${API}/user/fetchMenuUrls`,
	getCustomers: `${API}/customers/allcustomers`,
	getCustomerByCustCode: `${API}/customers/getCustomerByCustCode`,
	//bom list
	getCustBomList: `${API}/custbomlist/allCustBomList`,
	//customers
	// getCustomers: `${API}/customers/allcustomers`,
	// getCustomerByCustCode: `${API}/customers/getCustomerByCustCode`,
	// //bom list
	// getCustBomList: `${API}/custbomlist/allCustBomList`,
	getCustBomId: `${API}/custbomlist/getCustBomId`,

	//locations
	getMaterialLocationList: `${API}/materiallocationlist/allMaterialLocationList`,
	deleteMaterialLocationList: `${API}/materiallocationlist/deleteMaterialLocationList`,
	updateMaterialLocationList: `${API}/materiallocationlist/updateMaterialLocationList`,
	insertMaterialLocationList: `${API}/materiallocationlist/insertMaterialLocationList`,

	//mtrl data
	getMtrlData: `${API}/mtrlData/allmtrldata`,
	getRowByMtrlCode: `${API}/mtrlData/getRowByMtrlCode`,
	getSpecific_Wt: `${API}/mtrlData/getSpecific_Wt`,
	getGradeID: `${API}/mtrlData/getGradeID`,

	//shape data
	getAllShapes: `${API}/shapes/getAllShapes`,
	getRowByShape: `${API}/shapes/getRowByShape`,
	getAllShapeNames: `${API}/shapes/getAllShapeNames`,

	getPartsCreatedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Parts`,
	getPartsOpenedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Parts`,
	getPartsClosedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Parts`,
	getPartsCreatedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Parts&type3=Purchase`,
	getPartsOpenedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Parts&type3=Purchase`,
	getPartsClosedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Parts&type3=Purchase`,

	getUnitsCreatedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Units`,
	getUnitsOpenedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Units`,
	getUnitsClosedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Units`,
	getUnitsCreatedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Units&type3=Purchase`,
	getUnitsOpenedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Units&type3=Purchase`,
	getUnitsClosedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Units&type3=Purchase`,

	getSheetsCreatedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Sheets`,
	getSheetsOpenedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Sheets`,
	getSheetsClosedMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Sheets`,
	getSheetsOpenedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Received&type2=Sheets&type3=Purchase`,
	getSheetsCreatedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Created&type2=Sheets&type3=Purchase`,
	getSheetsClosedPurchaseMaterial: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegister?type1=Closed&type2=Sheets&type3=Purchase`,

	//Material Receipt Register
	getByTypeMaterialReceiptRegisterByRvID: `${API}/materialReceiptRegister/getByTypeMaterialReceiptRegisterByRvID`,
	insertHeaderMaterialReceiptRegister: `${API}/materialReceiptRegister/insertHeaderMaterialReceiptRegister`,
	updateHeaderMaterialReceiptRegister: `${API}/materialReceiptRegister/updateHeaderMaterialReceiptRegister`,
	deleteHeaderMaterialReceiptRegisterAndDetails: `${API}/materialReceiptRegister/deleteHeaderMaterialReceiptRegisterAndDetails`,

	//Material Part Receipt Details
	getPartReceiptDetailsByRvID: `${API}/mtrlPartReceiptDetails/getPartReceiptDetailsByRvID`,
	insertPartReceiptDetails: `${API}/mtrlPartReceiptDetails/insertPartReceiptDetails`,
	updatePartReceiptDetails: `${API}/mtrlPartReceiptDetails/updatePartReceiptDetails`,
	deletePartReceiptDetails: `${API}/mtrlPartReceiptDetails/deletePartReceiptDetails`,
	updateQtyReturnedPartReceiptDetails: `${API}/mtrlPartReceiptDetails/updateQtyReturnedPartReceiptDetails`,
	updateQtyReturnedPartReceiptDetails1: `${API}/mtrlPartReceiptDetails/updateQtyReturnedPartReceiptDetails1`,
	updateQtyIssuedPartReceiptDetails: `${API}/mtrlPartReceiptDetails/updateQtyIssuedPartReceiptDetails`,
	updateQtyIssuedPartReceiptDetails1: `${API}/mtrlPartReceiptDetails/updateQtyIssuedPartReceiptDetails1`,
	updateQtyIssuedPartReceiptDetails2: `${API}/mtrlPartReceiptDetails/updateQtyIssuedPartReceiptDetails2`,

	//Material Receipt Details
	getMtrlReceiptDetailsByRvID: `${API}/mtrlReceiptDetails/getMtrlReceiptDetailsByRvID`,
	getMtrlReceiptDetailsByID: `${API}/mtrlReceiptDetails/getMtrlReceiptDetailsByID`,
	insertMtrlReceiptDetails: `${API}/mtrlReceiptDetails/insertMtrlReceiptDetails`,
	updateMtrlReceiptDetails: `${API}/mtrlReceiptDetails/updateMtrlReceiptDetails`,
	updateMtrlReceiptDetailsAfter: `${API}/mtrlReceiptDetails/updateMtrlReceiptDetailsAfter`,
	deleteMtrlReceiptDetails: `${API}/mtrlReceiptDetails/deleteMtrlReceiptDetails`,
	updateMtrlReceiptDetailsUpdated: `${API}/mtrlReceiptDetails/updateMtrlReceiptDetailsUpdated`,
	updateSelectedRowMtrlReceiptDetails: `${API}/mtrlReceiptDetails/updateSelectedRowMtrlReceiptDetails`,

	//running no
	getRunningNo: `${API}/runningNo/getRunningNoBySrlType`,
	updateRunningNo: `${API}/runningNo/updateRunningNoBySrlType`,
	insertRunningNo: `${API}/runningNo/insertRunningNo`,
	getAndInsertRunningNo: `${API}/runningNo/getAndInsertRunningNo`,
	insertRunNoRow: `${API}/runningNo/insertRunNoRow`,
	insertAndGetRunningNo: `${API}/runningNo/insertAndGetRunningNo`,
	getAndUpdateRunningNo: `${API}/runningNo/getAndUpdateRunningNo`,

	//Material stock List
	//getMtrlReceiptDetailsByRvID: `${API}/mtrlReceiptDetails/getMtrlReceiptDetailsByRvID`,
	insertMtrlStockList: `${API}/mtrlStockList/insertMtrlStockList`,
	checkStockAvailable: `${API}/mtrlStockList/checkStockAvailable`,
	deleteMtrlStockByRVNo: `${API}/mtrlStockList/deleteMtrlStockByRVNo`,
	updateAfterRemoveStock: `${API}/mtrlStockList/updateAfterRemoveStock`,
	deleteMtrlStockByIVNo: `${API}/mtrlStockList/deleteMtrlStockByIVNo`,
	updateIssueIVNo: `${API}/mtrlStockList/updateIssueIVNo`,
	updateIVNoNULL: `${API}/mtrlStockList/updateIVNoNULL`,
	updateMtrlStockLock: `${API}/mtrlStockList/updateMtrlStockLock`,
	updateMtrlStockLock1: `${API}/mtrlStockList/updateMtrlStockLock1`,
	updateMtrlStockLock2: `${API}/mtrlStockList/updateMtrlStockLock2`,
	updateMtrlStockLock3: `${API}/mtrlStockList/updateMtrlStockLock3`,
	insertByReturnDetails: `${API}/mtrlStockList/insertByReturnDetails`,
	insertByMtrlStockID: `${API}/mtrlStockList/insertByMtrlStockID`,
	insertByMtrlStockIDResize: `${API}/mtrlStockList/insertByMtrlStockIDResize`,
	getDataByMtrlStockIdResize: `${API}/mtrlStockList/getDataByMtrlStockIdResize`,
	// New Running No for ShopFloor
	getNewRunningNo: `${API}/runningNo/getNewRunningNo`,
	updateRunNo: `${API}/runningNo/updateRunNo`,

	//material Return Details
	insertmaterialReturnDetails: `${API}/materialReturnDetails/insert`,
	deleteByIVNOMaterialReturnDetails: `${API}/materialReturnDetails/deleteByIVNO`,

	//return
	profileMaterialFirst: `${API}/return/profileMaterialFirst`,
	profileMaterialSecond: `${API}/return/profileMaterialSecond`,
	profileMaterialThird: `${API}/return/profileMaterialThird`,
	partFirst: `${API}/return/partFirst`,
	partSecond: `${API}/return/partSecond`,

	//material issue register
	insertMaterialIssueRegister: `${API}/materialIssueRegister/insert`,
	updateDCWeight: `${API}/materialIssueRegister/updateDCWeight`,
	updateStatusCancel: `${API}/materialIssueRegister/updateStatusCancel`,
	updateStatusDCNoDCID: `${API}/materialIssueRegister/updateStatusDCNoDCID`,
	getMaterialIssueRegisterRouterByIVID: `${API}/materialIssueRegister/getMaterialIssueRegisterRouterByIVID`,
	postCancleIV: `${API}/materialIssueRegister/postCancleIV`,
	//getAllReturnListing: `${API}/materialIssueRegister/getAllReturnListing?type=''`,
	getReturnPendingList: `${API}/materialIssueRegister/getAllReturnListing?type=pending`,
	getCustomerIVList: `${API}/materialIssueRegister/getAllReturnListing?type=customer`,
	getSalesIVList: `${API}/materialIssueRegister/getAllReturnListing?type=sales`,
	getCancelledList: `${API}/materialIssueRegister/getAllReturnListing?type=cancelled`,
	//getCheckReturnPendingList: `${API}/materialIssueRegister/checkPendingDispatchRouter`,

	insertMtrlIssueDetails: `${API}/mtrlIssueDetails/insert`,
	getmtrlIssueDetailsByIVID: `${API}/mtrlIssueDetails/getmtrlIssueDetailsByIVID`,

	//Reports
	//Material Management StockList
	getCustomerDetailsByMtrlStock: `${API}/mtrlStockList/getCustomerDetails`,
	getMaterialStockList1: `${API}/customstocklist/materialStockList1?`,
	getMaterialStockList2: `${API}/customstocklist/materialStockList2?`,
	getMaterialStockList3: `${API}/customstocklist/materialStockList3?`,

	//dc register
	insertDCRegister: `${API}/dcregister/insert`,
	getDCRegisterByID: `${API}/dcregister/getDCRegisterByID`,

	//dc details
	getLastInsertIDDCDetails: `${API}/dcdetails/getLastInsertID`,
	insertDCDetails: `${API}/dcdetails/insert`,

	//mtrl part issue details
	getmtrlPartIssueDetailsByIVID: `${API}/mtrlPartIssueDetails/getmtrlPartIssueDetailsByIVID`,
	insertPartIssueDetails: `${API}/mtrlPartIssueDetails/insert`,

	//shop floor issue
	getPartIssueVoucherList: `${API}/shopFloorIssue/getPartIssueVoucherList`,
	getMaterialIssueVoucherList: `${API}/shopFloorIssue/getMaterialIssueVoucherList`,
	getProductionMaterialIssueParts: `${API}/shopFloorIssue/getProductionMaterialIssueParts`,
	getProductionMaterialIssuePartsTable: `${API}/shopFloorIssue/getProductionMaterialIssuePartsTable`,
	getShopMaterialIssueVoucher: `${API}/shopFloorIssue/getShopMaterialIssueVoucher`,
	getShopMaterialIssueVoucherTable: `${API}/shopFloorIssue/getShopMaterialIssueVoucherTable`,
	getShopFloorServicePartTable: `${API}/shopFloorIssue/getShopFloorServicePartTable`,
	//for treeview
	getShopFloorServiceTreeViewMachine: `${API}/shopFloorIssue/getShopFloorServiceTreeViewMachine`,
	getShopFloorServiceTreeViewProcess: `${API}/shopFloorIssue/getShopFloorServiceTreeViewProcess`,
	getShopFloorServiceTreeViewMtrlCode: `${API}/shopFloorIssue/getShopFloorServiceTreeViewMtrlCode`,
	getShopFloorServiceTreeViewMtrlCodeClick: `${API}/shopFloorIssue/getShopFloorServiceTreeViewMtrlCodeClick`,

	//shopFloorReturn
	getFirstTableShopFloorReturn: `${API}/shopFloorReturn/getFirstMainTable`,
	getSecondTableShopFloorReturn: `${API}/shopFloorReturn/getSecondMainTable`,

	//shopfloorAllotment
	getShopFloorAllotmentPartFirstTable: `${API}/shopfloorAllotment/getShopFloorAllotmentPartFirstTable`,
	getShopFloorAllotmentPartFirstTableQtyAvl: `${API}/shopfloorAllotment/getShopFloorAllotmentPartFirstTableQtyAvl`,
	getShopFloorAllotmentPartSecondTableIds: `${API}/shopfloorAllotment/getShopFloorAllotmentPartSecondTableIds`,

	//shopfloorBOMIssueDetails
	insertShopfloorBOMIssueDetails: `${API}/shopfloorBOMIssueDetails/insertShopfloorBOMIssueDetails`,
	updateQtyReturnedShopfloorBOMIssueDetails: `${API}/shopfloorBOMIssueDetails/updateQtyReturnedShopfloorBOMIssueDetails`,

	//ncprograms
	updateQtyAllotedncprograms: `${API}/ncprograms/updateQtyAllotedncprograms`,
	updateQtyAllotedncprograms1: `${API}/ncprograms/updateQtyAllotedncprograms1`,
	updateQtyAllotedncprograms2: `${API}/ncprograms/updateQtyAllotedncprograms2`,
	getRowByNCID: `${API}/ncprograms/getRowByNCID`,

	//ncprogrammtrlallotmentlist
	insertncprogrammtrlallotmentlist: `${API}/ncprogrammtrlallotmentlist/insertncprogrammtrlallotmentlist`,
	updatencprogrammtrlallotmentlistReturnStock: `${API}/ncprogrammtrlallotmentlist/updatencprogrammtrlallotmentlistReturnStock`,

	//shopfloorPartIssueRegister
	updateStatusShopfloorPartIssueRegister: `${API}/shopfloorPartIssueRegister/updateStatusShopfloorPartIssueRegister`,
	// getPDFData: `${API}/shopfloorPartIssueRegister/getPDFData`,

	insertShopfloorPartIssueRegister: `${API}/shopfloorPartIssueRegister/insertShopfloorPartIssueRegister`,

	//shopfloorUnitIssueRegister
	getMaterialAllotmentTable1: `${API}/shopfloorUnitIssueRegister/getMaterialAllotmentTable1`,
	// getPDFData: `${API}/shopfloorUnitIssueRegister/getPDFData`,

	//shopfloorMaterialIssueRegister
	insertShopfloorMaterialIssueRegister: `${API}/shopfloorMaterialIssueRegister/insertShopfloorMaterialIssueRegister`,
	updateShopfloorMaterialIssueRegisterQtyReturnedAddOne: `${API}/shopfloorMaterialIssueRegister/updateShopfloorMaterialIssueRegisterQtyReturnedAddOne`,

	//store
	getResizeMtrlStockList: `${API}/storeMng/getResizeMtrlStockList`,
	getMoveStoreMtrlStockByCustomer: `${API}/storeMng/getMoveStoreMtrlStockByCustomer`,
	getMoveStoreMtrlStockByLocation: `${API}/storeMng/getMoveStoreMtrlStockByLocation`,
	getMoveStoreCustomerMtrlStockByLocation: `${API}/storeMng/getMoveStoreCustomerMtrlStockByLocation`,
	getMoveStoreMtrlStockByAll: `${API}/storeMng/getMoveStoreMtrlStockByAll`,
	updateMtrlstockLocationByMtrlStockId: `${API}/storeMng/updateMtrlstockLocationByMtrlStockId`,
	getLocationListMtrlStockCount: `${API}/storeMng/getLocationListMtrlStockCount`,
	getStockListByCustCodeFirst: `${API}/storeMng/getStockListByCustCodeFirst`,
	getStockListByCustCodeSecond: `${API}/storeMng/getStockListByCustCodeSecond`,
	getStockListByCustCodeThird: `${API}/storeMng/getStockListByCustCodeThird`,
	getStockArrivalFirstTable: `${API}/storeMng/getStockArrivalFirstTable`,
	getStockArrivalSecondTable: `${API}/storeMng/getStockArrivalSecondTable`,
	getStockArrivalThirdTable: `${API}/storeMng/getStockArrivalThirdTable`,
	insertStockArrivalMtrlReceiptList: `${API}/storeMng/insertStockArrivalMtrlReceiptList`,
	getStockDispatchFirstTable: `${API}/storeMng/getStockDispatchFirstTable`,
	getStockDispatchSecondTable: `${API}/storeMng/getStockDispatchSecondTable`,
	getStockDispatchThirdTable: `${API}/storeMng/getStockDispatchThirdTable`,
	insertStockDispatchMtrlSales: `${API}/storeMng/insertStockDispatchMtrlSales`,
	getLocationStockSecond: `${API}/storeMng/getLocationStockSecond`,
	getLocationStockThird: `${API}/storeMng/getLocationStockThird`,

	//report
	getDailyReportMaterialReceipt1: `${API}/report/getDailyReportMaterialReceipt1`,
	getDailyReportMaterialReceipt2: `${API}/report/getDailyReportMaterialReceipt2`,
	getDailyReportMaterialDispatch: `${API}/report/getDailyReportMaterialDispatch`,
	updateSrlWghtMaterialDispatch: `${API}/report/updateSrlWghtMaterialDispatch`,
	getDailyReportMaterialSales: `${API}/report/getDailyReportMaterialSales`,
	getDailyReportMaterialPurchase: `${API}/report/getDailyReportMaterialPurchase`,

	getMonthlyReportMaterialPurchaseDetails: `${API}/report/getMonthlyReportMaterialPurchaseDetails`,
	getMonthlyReportMaterialSalesSummary: `${API}/report/getMonthlyReportMaterialSalesSummary`,
	getMonthlyReportMaterialPurchaseSummary: `${API}/report/getMonthlyReportMaterialPurchaseSummary`,
	getMonthlyReportMaterialSalesDetails: `${API}/report/getMonthlyReportMaterialSalesDetails`,
	getMonthlyReportMaterialHandlingSummary: `${API}/report/getMonthlyReportMaterialHandlingSummary`,

	getPartListInStockAndProcess: `${API}/report/getPartListInStockAndProcess`,
	getPartListReceiptAndUsageFirst: `${API}/report/getPartListReceiptAndUsageFirst`,
	getPartListReceiptAndUsageSecond: `${API}/report/getPartListReceiptAndUsageSecond`,
	getPartListReceiptAndUsageThird: `${API}/report/getPartListReceiptAndUsageThird`,
	getPartListReceiptAndUsageFourth: `${API}/report/getPartListReceiptAndUsageFourth`,

	//updateOutwordMaterialVocher: `${API}/mtrlIssueDetails/updatemtrlIssueDetailsRouter`,

	/*getCustCodeName: `${API}/customers/allcustcodename`,
  getCustomerDets: `${API}/customers/getcustomer`,
  dueListCustomer: `${API}/customers/customerduelist`,
  overdueListCustomer: `${API}/customers/customeroverduelist`,
  dueSummaryCustomer: `${API}/customers/customerduessummary`,
  receiptsinfoCustomer: `${API}/customers/customerreceiptsinfo`,
  dLInvFormCustomer: `${API}/customers/customerdlinvform`,
  dLInvFormTaxDetsCustomer: `${API}/customers/customerdlinvformtaxdets`,
  receiptDetsCustomer: `${API}/customers/customerreceiptdets`,
  printDueReport: `${API}/customers/printduereport`,
  sendAttachmentMails: `${API}/mailer/sendDirectMail`,

  dxfupload: `${API}/file/uploaddxf`,
  getDwgFiles: `${API}/file/getdxfnames`,

  getStates: `${API}/states/allstates`,
  getStateCode: `${API}/states/getstatecode`,
  getStateName:`${API}/states/getstatename`,
  getCreditTerms: `${API}/creditterms/allcreditterms`,
  getMtrlSources: `${API}/mtrlsources/allmtrlsources`,
  getMtrlTypeLists: `${API}/mtrlgrades/allmtrltypelists`,
  getMtrlGrdTypes: `${API}/mtrlgrades/allmtrlgrdtypes`,
  getMtrlShapes: `${API}/mtrlgrades/allmtrlshapes`,
  getMtrlShapeGrds: `${API}/mtrlgrades/allmtrlshapegrades`,
  saveNewMtrlGrades: `${API}/mtrlgrades/savenewmtrlgrades`,
  getPackingLevels: `${API}/packinglevels/allpackinglevels`,
  getTaxDetails: `${API}/taxdetails/alltaxdetails`,

  getCustBOMParts: `${API}/customers/getcustomerbomparts`,
  assyPartCustomer: `${API}/customers/customerassy`,
  assyInsertPartCustomer: `${API}/customers/customerinsassembly`,
  getCustPartDetails: `${API}/customers/getcustpartdetails`,
  bomAssemblyParts: `${API}/customers/bomassemblyparts`,
  custbomAssemblyParts : `${API}/customers/custbomassemblyparts`,
  UpdateBOMAssembly:`${API}/customers/updatebomassembly`,
  DeleteBOMAssemblyPart:`${API}/customers/deletebomassmparts`,
  saveCustBOMParts: `${API}/customers/custbomparts`,
  chkAssyDupl : `${API}/customers/chkassydupl`,

  scheduleTasksCustomer: `${API}/customers/schtasksdets`,
  drawingsCustomer: `${API}/customers/customersdrawings`,
  ordStatusCustomer: `${API}/customers/orderstatus`,
  ordersCustomer: `${API}/customers/customerorders`,
  orderScheduleCustomer: `${API}/customers/orderschedule`,
  orderInvoicesCustomer: `${API}/customers/orderinvoices`,
  orderDetailsCustomer: `${API}/customers/orderdetails`,
  ordSchTasksCustomer: `${API}/customers/orderschtasks`,
  schDetsCustomer: `${API}/customers/schdets`,
  invDwgCustomer: `${API}/customers/orderinvdwg`,
  updateCustomer: `${API}/customers/customerupdate`,
  insertContactTeleNos : `${API}/customers/insertcontacttelenos`,
  getCustomerDetails: `${API}/customers/getcustomerdetails`,
  createCustomer: `${API}/customers/customer`,

 
  getCustomerContactDets: `${API}/customers/getcustomercontactdets`,
  getCustomerContactTeleDets: `${API}/customers/getcustomercontactteledets`,
  outStandingCustomers: `${API}/customers/customeroutstandings`,
  individualCustomer: `${API}/customers/outstandinginvoices`,
  pprDueListCustomer: `${API}/customers/pprcustomerduelist`,
  getCustDuesOverdues: `${API}/customers/customerduesoverdues`,
  
  mtrlStockCustomer: `${API}/customers/customermtrlstock`,
  mtrlReceiptsCustomer: `${API}/customers/customermtrlreceipts`,
  mtrlPartsReturnedCustomer: `${API}/customers/customermtrlpartsreturned`,
  mtrlScrapUnusedReturnedCustomer: `${API}/customers/customermtrlscrapUnusedreturned`,
  mtrlReceiptDetailsCustomer: `${API}/customers/customermtrlrectdetails`,
  getCustPartRects: `${API}/customers/getcustpartrects`,
  getMtrlRVList: `${API}/customers/getmtrlrvlist`,

  getMaterials: `${API}/materials/allmaterials`,
  getProcessLists: `${API}/processlists/allprocesslists`,
  getMtrlGrades: `${API}/mtrlgrades/allmtrlgrades`,
  getToleranceTypes: `${API}/tolerancetypes/alltolerancetypes`,
  getInspectionLevels: `${API}/inspectionlevels/allinspectionlevels`,
  getMtrlGrade: `${API}/mtrlgrades/mtrlgrad`,
  getMaterialSpWt: `${API}/mtrlgrades/getmaterialspwt`,

  createQuotation: `${API}/quotation/quotation`,
  getQuotations:`${API}/quotation/getquotations`,
  getQuotationList: `${API}/quotation/getquotationlist`,
  qtnStatusUpdate: `${API}/quotation/quotationstatusupdate`,
  getQtnRejnReasons: `${API}/quotation/getqtnrejnreasons`,
  saveQtnTaskListDetails: `${API}/quotation/saveqtntasklistdets`,
  saveProfileListdata: `${API}/quotation/saveprofilelistdata`,
  saveTaskDetails: `${API}/quotation/savetaskdetails`,
  getTaskMaterialRates: `${API}/quotation/gettaskmaterialrates`,
  getOperationMtrlRateList: `${API}/quotation/getoperationmtrlratelist`,
  getMtrlHandlingRates: `${API}/quotation/getmtrlhandlingrates`,
  getTaskProgrammingRates: `${API}/quotation/gettaskprogrammingrates`,
  UpdateProfileDetails: `${API}/quotation/updateprofiledetails`,
  //getTaxDetails: `${API}/taxdetails/alltaxdetails`,
  getQtntcDetails: `${API}/quotation/getqtntcdetails`,
  getQtnTaxDetails: `${API}/quotation/getqtntaxdetails`,
  getQuotationItems: `${API}/quotation/getquotationitems`,
  getTermsConditions: `${API}/termsconditions/alltermsconditions`,
  saveQuotationItems: `${API}/quotation/quotationitemslist`,
  updateQuotation: `${API}/quotation/updatequotation`,
  qtnItemsDeleteandSave: `${API}/quotation/qtnitemsdeleteandsave`,
  deleteQtnItemData: `${API}/quotation/deleteqtnitemdata`,
  qtnItemsDeletedSave: `${API}/quotation/qtnitemsdeletedsave`,
  getEstimateList: `${API}/quotation/getestimate`,
  getSelectedQuotation: `${API}/quotation/getselectedquotation`,

  getMtrlDetails: `${API}/materials/getmtrldetails`,
  getMtrlLocation: `${API}/materials/getmtrllocation`,
  getOrderSchedule: `${API}/sigmanc/getorderschedule`,
  getNCTaskList: `${API}/sigmanc/getnctasklist`,
  getNCTaskParts: `${API}/sigmanc/getnctaskparts`,
  getProgramListData: `${API}/sigmanc/getprogramlistdata`,
  getMtrlAvailability: `${API}/sigmanc/getmtrlavailability`,
  updateProgramStatus: `${API}/sigmanc/updateprogramstatus`,
  getMachineDetails: `${API}/machine/allmachines`,

  getProdSchListDetails: `${API}/production/getprodschlistdetails`,
  getNCProgramListData: `${API}/production/getncprogramlistdata`,

  getOrderData: `${API}/order/getorderdata`,
  getOrdDetailsData: `${API}/order/getorddetailsdata`,
  getSalesExecLists: `${API}/salesexecutives/allsalesexeclists`,
  getCombinedTaskSch: `${API}/order/getcombinedschdata`,
  getOrderScheduleData: `${API}/order/getorderscheduledata`,
  getSelectedSchDwgData: `${API}/order/getselectedschdwgdata`,
  getSalesTasksData: `${API}/order/getsalestasksdata`,
  getSelectedSalesTaskList: `${API}/order/getselectedsalestasklist`,
  getPrepareScheduleDetails:  `${API}/order/preparescheduledetails`,

  getPackScheduleDetails: `${API}/packinv/getpackingschedules`,
  getPackSchDetails: `${API}/packinv/getpackschdetails`,
  getExNotifDetails: `${API}/packinv/getexnotifications`,
  getPckScheduleDetails: `${API}/packinv/getpckscheduledetails`,

  getMtrlStocks: `${API}/stocks/getmtrlstocks`,
  getMtrlCodeStocks: `${API}/stocks/getmtrlcodestocks`,
  getMtrlStocksDets: `${API}/stocks/getmtrlstocksdets`,
  getStockArrivalSummary: `${API}/stocks/getstockarrivalsummary`,
  getStockArrivalReceipts: `${API}/stocks/getstockarrivalreceipts`,
  getStockArrivalReceiptList: `${API}/stocks/getstockarrivalreceiptList`,

  getSalesDispatchSummary: `${API}/stocks/getsalesdispatchsummary`,
  getSalesDispatchInvoices: `${API}/stocks/getsalesdispatchinvoices`,
  getSalesDispatchStockList: `${API}/stocks/getsalesdispatchstocklist`,

  getUserRoles: `${API}/user/getuserroles`,
  addUserRoles: `${API}/user/adduserroles`,
  updUserRoles: `${API}/user/upduserroles`,
  delUserRoles: `${API}/user/deluserroles`,
  getUserModules: `${API}/user/getusermodules`,
  addUserModules: `${API}/user/addusermodules`,
  getUserMenus: `${API}/user/getusermenus`,
  getUsers: `${API}/user/getusers`,
  addUserMenus: `${API}/user/addusermenus`,
  delUserMenus:`${API}/user/delusermenus`,
  getUnits: `${API}/units/allunits`,
  saveUsers: `${API}/user/saveusers`,
  delUsers:`${API}/user/delusers`,
  loginAPI: `${API}/user/login`,
  saveMenuRoleMapping: `${API}/user/savemenurolemapping`,
  getRoleMenus: `${API}/user/getrolemenus`,

  getDlyRepSales: `${API}/accounts/salesinvoices`,
  getTaxSummary: `${API}/accounts/taxsummary`,
  getPaymentReceipts: `${API}/accounts/paymentreceipts`,
  getPaymentRectsDetails: `${API}/accounts/paymentrectdetails`,
  getPrdSummary: `${API}/accounts/prdsummary`,*/

	getPDFData: `${API}/pdf/getPDFData`,
};
