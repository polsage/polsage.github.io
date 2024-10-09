
async function getallevent(){

transid = parseInt($('#username').val());
transid = transid + 1
//alert(transid)
    contract.getPastEvents('Payout', {
    filter: {}, // Using an array means OR: e.g. 20 or 23
    fromBlock: transid,
    toBlock: transid + 5000
    // toBlock: 'latest',
}, function(error, events){ console.log(events); })
.then(function(res){
	Eventdetail(res);
	//let res = txlog["events"]["Payout"];
      //  var len = res.length;
       // console.log("Event Detail ",res);
        //for(var i =len-1;i>=0;i--){
        //var amt = res[i]["returnValues"]["dividend"];
        //console.log("Amt" + amt);
        //}
        
   // console.log(events) // same results as the optional callback above
});

}


async function getLatestevent(){

transid = parseInt($('#username').val());
alert(transid)
    contract.getPastEvents('Payout', {
    filter: {}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 'latest',
    toBlock: 'latest',
}, function(error, events){ console.log(events); })
.then(function(res){
		 var len = res.length;
        console.log("Record ",len);
        console.log("Event Detail ",res);
        
        //for(var i =len-1;i>=0;i--){
        for(var i =0;i<len;i++){
       
        var blockno = res[i]["blockNumber"];
        alert(blockno);
       }

	//Eventdetail(res);
	//let res = txlog["events"]["Payout"];
      //  var len = res.length;
       // console.log("Event Detail ",res);
        //for(var i =len-1;i>=0;i--){
        //var amt = res[i]["returnValues"]["dividend"];
        //console.log("Amt" + amt);
        //}
        
   // console.log(events) // same results as the optional callback above
});

}




async function deletedata(){
	$.ajax({
            url: url,
            type: 'POST',
            cache: true,
            async: true,
            //dataType: 'json',
            data: {
            	mod:25,
    
            },
        	success: function (response) {
        	console.log("seq log  : " +response);
        	
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText)
            }
        });

}





