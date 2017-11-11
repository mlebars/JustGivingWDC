(function () {
    var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
	    var cols = [{
	        id: "id",
	        dataType: tableau.dataTypeEnum.int
	    }, {
	        id: "charityId",
	        dataType: tableau.dataTypeEnum.int
	    }, {
	        id: "donationDate",
	        alias: "donationDate",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	    	id: "donorDisplayName",
	        alias: "donorDisplayName",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "currencyCode",
	        alias: "currencyCode",
	        dataType: tableau.dataTypeEnum.string    
	    }, {
	    	id: "amount",
	        alias: "amount",
	        dataType: tableau.dataTypeEnum.float    
	    }, {
	        id: "donorLocalCurrencyCode",
	        alias: "donorLocalCurrencyCode",
	        dataType: tableau.dataTypeEnum.string    
	    }, {
	    	id: "donorLocalAmount",
	        alias: "donorLocalAmount",
	        dataType: tableau.dataTypeEnum.float    
	    }, {
	        id: "donationRef",
	        alias: "donationRef",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "thirdPartyReference",
	        alias: "thirdPartyReference",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "image",
	        alias: "image",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "message",
	        alias: "message",
	        dataType: tableau.dataTypeEnum.string
	    }];

	    var tableSchema = {
	        id: "donationsfeed",
	        alias: "Donations for selected fundraiser",
	        columns: cols
	    };

	    schemaCallback([tableSchema]);
	};

	myConnector.getData = function(table, doneCallback) {
	    var fundraiser = $("#fundraiser").val();
	    var url = "https://api.justgiving.com/7e017f27/v1/fundraising/pages/" + fundraiser + "/donations";
	    console.log(url);
	    var donations = {};
	    var tableData = [];
	    $.ajax({
    		type: "GET",
   		url: url,
    		dataType : 'json'
	    }).done(function (obj) {
  		donations = obj;
		var x = donations.donations;
  		for (var i = 0, len = x.length; i < len; i++) {
		    tableData.push({
			  "id": x[i].id,
			  "charityId": x[i].charityId,
			  "donationDate": x[i].donationDate,
			  "donorDisplayName": x[i].donorDisplayName,
			  "currencyCode": x[i].currencyCode,
			  "amount": x[i].amount,
			  "donorLocalCurrencyCode": x[i].donorLocalCurrencyCode,
			  "donorLocalAmount": x[i].donorLocalAmount,
			  "donationRef": x[i].donationRef,
			  "thirdPartyReference": x[i].thirdPartyReference,
			  "image": x[i].image,
			  "message": x[i].message
	             });
		}
	table.appendRows(tableData);
	doneCallback();
	console.log(tableData);
	});
    };

    tableau.registerConnector(myConnector);

	$(document).ready(function () {
    	$("#submitButton").click(function () {
        	tableau.connectionName = "Just Giving - Fundraiser Donations";
        	tableau.submit();
    	});
});
})();
