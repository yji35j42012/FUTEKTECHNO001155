var uid = parent.uid;
var util = parent.util;
var listenEvt = parent.listenEvt;

var defAgent = new Object();
var testAgent = new Object();
var noAgent = new Object();
var lazyDemoStatus;
var token 
var current_key 
var key 
var agid
function init() {
	PostPHP("./api_demo.php", "code=123");
	listenEvent = new listenEvent();	//監聽事件
	listenEvent.addHyperLink();
}


function PostPHP(url, parame) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		// console.log("postPHP >"+url+" readyState:"+xmlhttp.readyState+"  status:"+xmlhttp.status)
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var phpData = strToObj(xmlhttp.responseText);
			// alert(phpData);
			console.log(phpData);
			getData(phpData);
		} else {
			
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parame);
}
function strToObj(str) {
	//console.log(str);
	if (str.match("window.open")) {
		var scr = "<";
		scr += "script";
		scr += ">";
		str = str.replace(scr, "");
		str = str.replace(scr, "");
		//eval(str);
		//return;
	}

	try {
		//console.log("++++++++");
		return (new Function("return " + str + ";"))();
	} catch (e) {
		//console.log("-----------");
		return str;
	}
}

function lazyAccLogin(a,p,c){
	console.log("lazyAccLogin",a,p,c);
	document.getElementById("normal_loading").classList.add("on");
	var param = "act=AGLogin";
	if(!langx){
		langx='zh-tw'
	}
	param += "&langx="+langx;
	param += "&c="+c;
	param += "&p="+p;
	param += "&a="+a;
	PostPHP("func/api_rec/api_demo.php", param);
}
function lazyDemo(){
	// if(window.location.href.indexOf("cvssp2017")!=-1){
	// 	agent = testAgent;
	// }else 
	if(window.location.href.indexOf("ctliiti566.cvssp2017")!=-1){
		agent = testAgent;	
	}else if(window.location.href.indexOf("205.201.14.45")!=-1){
		agent = noAgent;	// 客服要求將UAT預設值拿掉
	}else{
		agent = defAgent;
	}
	
	console.log("lazy_demo");
	lazyDemoStatus = "Y";
	lazyLogin();
}
function lazyLogin(){
	console.log("lazyLogin");
	document.getElementById("normal_loading").classList.add("on");
	var param = "act=AGLogin";
	if(!langx){
		langx='zh-tw'
	}
	param += "&langx="+langx;
	param += "&c="+ document.getElementById("curselect").value ;
	PostPHP("func/api_rec/api_demo.php", param);
}
function lazyGameDemo(){
	var machine='';
	console.log("lazyGameDemo");
	if (window.innerWidth < 1024) { //判定為手機
		machine="MOBILE";
	}else{
		machine="PC";
	}
	if(langx=="km-kh"){
		langx="en-us";
	}
	ip="";
	aCode="";
	var param = 
	"ip="+ip
	+"&token="+token
	+"&aCode="+aCode
	+"&machine="+machine
	+"&act=LaunchDemo";

	lazyDemoStatus="N";
	//document.getElementById("showdata").innerHTML="登入中....稍等";
	PostPHP("func/api_rec/api_demo.php", param);
}





function getData(obj){
	var json = artjson[langx];
	if(typeof(obj)=="object"){
		if(obj.code){
			if(obj.code=="0000"){
				if(obj.method=="AGLogin"){
					token =obj.token; // document.getElementsByName("token");
					current_key ="v3dXrAIpqViBKjn0"; //document.getElementById("sKey");
					key = current_key; //document.getElementsByName("keys");
					agid =obj.aid //document.getElementsByName("agid");
					// for(var i=0;i<token.length;i++){
					// 	token[i].value=obj.token;
					// 	agid[i].value=obj.aid;
					// 	key[i].value=current_key.value;
					// }
					if(lazyDemoStatus=="Y"){
						lazyGameDemo();
					}
					return;
				}
				if(obj.method=="LaunchDemo"){
					document.getElementById("normal_loading").classList.remove("on");
					if(obj.launchdemourl){
						// window.open(obj.launchdemourl,"_blank");
						window.location.href = obj.launchdemourl;
					}
					
				}else if(obj.url){
					document.getElementById("normal_loading").classList.remove("on");
					// window.open(obj.url,"_blank");	
					window.location.href = obj.url;
				}
			}else{
				// alert(json["er_"+obj.code]);	
				showMsg(json["er_"+obj.code]);
			}
		}else{
			// alert(json["er_1x999"]);
			showMsg(json["er_1x999"]);
		}
	}else{
		//document.getElementById("showdata").innerHTML=obj;
		// alert(obj);
		showMsg(json["er_1x999"]);
		// alert(json["er_1x999"]);
	}
	document.getElementById("normal_loading").classList.remove("on");
}



//監聽事件
function listenEvent() {
    var self = this;

    //建立監聽事件(靜態)
    self.addHyperLink = function () {
		var btn = util.getSpan(document, "allbtn");
		for(var i =0;i<btn.children.length;i++){
			listenEvt.addOnClick(btn.children[i].id, btn.children[i], this, null);
		}
        

    }

    //建立監聽事件(動態)
    self.addListenEvent = function () {
        
    }

    //監聽事件回應
    self.listenCenter = function (eventName, listenData) {
			var obj = listenData;
      if(eventName.indexOf("_btn")!=-1){				
				var table = document.getElementsByName("div_table");
				var target_id = obj.div.id.split("_");
				var target = util.getSpan(document,target_id[0]+"_table");
				// console.log(target_id);
				for(var i=0;i<table.length;i++){
					table[i].style.display="none";
				}
				target.style.display="";
				return;
			}

    }
}

function showMsg(msg){
	if(document.getElementById("loginmsg")){
		document.getElementById("loginmsg").innerHTML=msg;
		document.getElementById("loginmsg").classList.add("on");
	}else{
		alert(msg);
	}
}
