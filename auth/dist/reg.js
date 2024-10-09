const DEFAULT_GASPRICE = 45e9;
const url = $('#baseurl').val()+ "report";
var account ="";



async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');
}

function updateStatus(status) {
   // const statusEl = document.getElementById('status');
    //statusEl.innerHTML = status;
    console.log(status);
}

async function loadContract() {
    return await new window.web3.eth.Contract(abi, contract_address);
}

async function printCoolNumber() {
    updateStatus('fetching Cool Number...');
    const coolNumber = await window.contract.methods.coolNumber().call();
    updateStatus(`coolNumber: ${coolNumber}`);
}

async function changeCoolNumber() {
    const value = Math.floor(Math.random() * 100);
    updateStatus(`Updating coolNumber with ${value}`);
    const account = await getCurrentAccount();
   // const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
    const coolNumber = await window.contract.methods.updateM4Matrix(account,2).send( {from: account}).then(( info ) => {
  	console.log("log receive : ", info); 
  	console.log("tx ", info["transactionHash"]);

  	console.log("New Id ", info["events"]["Testor21"]['returnValues']['benid']);
  	console.log("Ben Id ", info["events"]["Testor21"]['returnValues']['topid']);
  
    //  document.getElementById('lastInfo').innerHTML = info;
  });
  
    updateStatus('Updated.');
}

async function getCurrentAccount() {
    accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

async function logintoaccount() {
	account = await getCurrentAccount();
//	console.log("test",account);
   var login = await loginprocess(account);
   
 }
 
 async function logdata(){
alert("start login");
account = await getCurrentAccount();
   loginprocess(account);
} 

 
async function loginprocess(address){
// console.log("address",address);
   
    	const userdata = await window.contract.methods.users(address).call();
    
     
        var newForm = jQuery('<form>', {
        'action': $('#baseurl').val()+'prcoessdata',
        'method': 'post'
   	 });
    
    
		var input = $("<input>").attr("type", "hidden").attr("name", "email").val(""+userdata["id"]);
		$(newForm).append($(input));
	
		input = $("<input>").attr("type", "hidden").attr("name", "hmod").val("2");
		$(newForm).append($(input));
    
		newForm.appendTo('body').submit();
      //  buy(id,tronWeb.toDecimal(res));
    
    
}	

async function Eventdetail(res){
    try {
        var len = res.length;
        console.log("Record ",len);
        console.log("Event Detail ",res);
        alert(res);
        //for(var i =len-1;i>=0;i--){
        for(var i =0;i<len;i++){
       
        var blockno = res[i]["blockNumber"];
       
        var thash = res[i]["transactionHash"];
        
        var TTime = res[i]["timestamp"];
     
        alert(TTime);
        var userid= res[i]["returnValues"]["userid"];
        var refid = res[i]["returnValues"]["refid"];
         
        var user= res[i]['returnValues']['sender'];
        var referrer= res[i]["returnValues"]["receiver"];
         
        var matrix= res[i]["returnValues"]["matrix"];
        var level= res[i]["returnValues"]["level"];
        var amt = res[i]["returnValues"]["dividend"];
        var place= res[i]["returnValues"]["recid"];
        var tstatus= res[i]["returnValues"]["renty"];
       
        var amod= 0;
        var adddatalog = await addlog(i,len-1,blockno,thash,TTime,userid,refid,user,referrer,matrix,level,place,amt,tstatus,amod);
        
		}
    } catch (error) {
    //	console.log("Tx 2",error);
        //console.log(error);
        $('#logtext').html("Error :" + error);
        $('#login_popup').modal("hide");
    }
}

async function addlog(i,len,blockno,thash,TTime,newuserid,refid,user,referrer,matrix,level,place,amt,tstatus,amod){
	$.ajax({
            url: url,
            type: 'POST',
            cache: true,
            async: true,
            //dataType: 'json',
            data: {
            	mod:3,
            	blockno: blockno,
                ttime:TTime,
                hash : thash,
                from : user,
            	userid :newuserid,
                to: referrer,
                refid:refid,
                matrix:matrix,
                level: level,
                position: place,
                amt : amt,
                status:tstatus,
                action : amod
            },
        	success: function (response) {
        	//console.log("seq log " + i + " : " + len + " : " +response);
        	
               if(i == len){
              // alert("data sync");
			 //  logintoaccount();
alert("data sync");
location.reload();
		}   
            }
        //    error: function (jqXHR, textStatus, errorThrown) {
          //      console.log('Error Ajax request: ' + jqXHR.responseText)
            //}
        });
}


async function addlogmanual(){

blockno = $('#blockno').val();
thash= $('#thash').val();
newuserid= $('#usid').val();

refid= $('#rid').val();
user= $('#uadd').val();
referrer= $('#radd').val();
matrix= $('#matrix').val();
level= $('#level').val();
place= $('#recid').val();
amt= $('#amt').val();
tstatus= $('#reentry').val();
amod=0;



	$.ajax({
            url: url,
            type: 'POST',
            cache: true,
            async: true,
            //dataType: 'json',
            data: {
            	mod:3,
            	blockno: blockno,
                ttime:'',
                hash : thash,
                from : user,
            	userid :newuserid,
                to: referrer,
                refid:refid,
                matrix:matrix,
                level: level,
                position: place,
                amt : amt,
                status:tstatus,
                action : amod
            },
        	success: function (response) {
        	//console.log("seq log " + i + " : " + len + " : " +response);
        	
              // if(i == len){
              // alert("data sync");
			 //  logintoaccount();
alert("data add");
location.reload();
		//}   
            }
        //    error: function (jqXHR, textStatus, errorThrown) {
          //      console.log('Error Ajax request: ' + jqXHR.responseText)
            //}
        });
}


function price(nn){
	var price = 0.010;
	if(nn<=4){
		for(var i=3;i<=nn;i++){
		 price = price * 2;
		}
	}else{
		price = 0.1;
		for(var i=6;i<=nn;i++){
			price = price * 2;
		}
	}
	
price *= 1000000000000000000;
return price;
}

async function registerNew() {

	


	var regamt = price(1);
	account = await getCurrentAccount();
   // const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
    var refid = $('#refid').val();
    
    
 
    
    const referdata = await window.contract.methods.userIds(refid).call();
    console.log('Delivery made ' + referdata);
	if(referdata && referdata != '0x0000000000000000000000000000000000000000') {
		
		refaddress = referdata;
		 console.log('Delivery made ' + refaddress);
		//var matrixprice = window.web3.toWei(regamt);
   let text = "You are Registering on Evergreen World with Sponsor Id " + refid + " and Sponsor Address is " + refaddress + "  Press Ok to continue!";
  if (confirm(text) == true) {
    
 
	
		const coolNumber = await window.contract.methods.registrationExt(refaddress).send( {from: account,value:regamt,gasPrice: DEFAULT_GASPRICE}).then(( info ) => {
  		//console.log("log receive : ", info); 
  		
  		//price =info["events"]["matrixdata"][i]['returnValues']['price'];
 		logintoaccount();
 		
  		//Eventdetail(info["events"]["Payout"]);
  		//console.log("tx ", info["transactionHash"]);
  		//console.log("New Id ", info["events"]["Testor21"]['returnValues']['benid']);
  		//console.log("Ben Id ", info["events"]["Testor21"]['returnValues']['topid']);
  		});

 } 
	}else{
		alert("invalid sponsor id or sponsor id does not exist");
		console.log('error');
	}
	
    
}

async function buyslot() {
	var regamt = price(1);
	account = await getCurrentAccount();
   // const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
   // var refid = $('#refid').val();
   var lvl = $('#refid').val();
   
    let text = "You are activating slot : " + lvl + " on Evergreen World. Press Ok to continue!";
  if (confirm(text) == true) {
    
    const flag = await window.contract.methods.isUserExists(account).call();
 
 	if(flag) {
 		
   
		var regamt = price(lvl);
		
		console.log("log " +  lvl + " Price " + regamt); 
  	
		//var matrixprice = window.web3.toWei(regamt);
	//	gasPrice: web3.toWei(40,'gwei')})
		const coolNumber = await window.contract.methods.buyNewLevel(lvl).send( {from: account,value:regamt}).then(( info ) => {
  		console.log("log receive : ", info); 
  		
  		logintoaccount() ;
  	
  		//Eventdetail(info["events"]["Payout"]);
  	
  		//console.log("tx ", info["transactionHash"]);
  		//console.log("New Id ", info["events"]["Testor21"]['returnValues']['benid']);
  		//console.log("Ben Id ", info["events"]["Testor21"]['returnValues']['topid']);
  		});
	}else{
		alert("invalid user or user does not exist");
		console.log('user does not exist');
	}
	}
    
}





load();





