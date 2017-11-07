(function () {
    var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
	    var cols = [{
	        id: "id",
	        dataType: tableau.dataTypeEnum.int
	    }, {
	        id: "charityid",
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
	    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
	        var feat = resp.features,
	            tableData = [];

	        // Iterate over the JSON object
	        for (var i = 0, len = feat.length; i < len; i++) {
	            tableData.push({
	                "id": feat[i].id,
	                "mag": feat[i].properties.mag,
	                "title": feat[i].properties.title,
	                "location": feat[i].geometry
	            });
	        }

	        table.appendRows(tableData);
	        doneCallback();
	    });
	};

    tableau.registerConnector(myConnector);

	$(document).ready(function () {
    	$("#submitButton").click(function () {
        	tableau.connectionName = "USGS Earthquake Feed";
        	tableau.submit();
    	});
});
})();



/* 

var donations = $.ajax({
   type: "GET",
   url: "https://api.justgiving.com/7e017f27/v1/fundraising/pages/jenny-houghton1/donations",
   dataType: "xml"
});

var xmlDoc = $.parseXML(donations);

$xml = $(xmlDoc),
$message = $xml.find("message");

alert($message.val());

*/