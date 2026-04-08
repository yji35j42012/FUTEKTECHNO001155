function onload() {
	// var barPercent = 0;
	// var barTime = setInterval(function () {
	// 	barPercent += 1;
	// 	document.getElementById("light_ball").style.left = barPercent + "%";
	// 	document.getElementById("light_bar").style.left = barPercent + "%";
	// 	var now = parseInt(barPercent);
	// 	document.getElementById("loadPercentNum").innerHTML = now;
	// 	if (now >= 100) {
	// 		clearInterval(barTime);
	// 		document.getElementById("load").classList.remove('active');
	// 		setTimeout(function () {
	// 			document.getElementById("load").style.display = "none";
	// 		}, 1000);
	// 		setTimeout(function () {
	// 			document.getElementById("hm_1").classList.add('active');
	// 		}, 1000);
	// 		setTimeout(function () {
	// 			document.body.classList.remove('unScroll');
	// 		}, 4000);
	// 	}
	// }, 20);
	// scrollTo(0);
	// setScollEvent();
	// setBannerMouseEvent();
	// activeBanner();
	// setRecruitMouseEvent();
	// goPlayRecruit();
    // setupMenu();
    
    initlogin();
    displayLoginDiv(true);
}

var bannePlay = true;
var banneStart = null;
var banneRecruitStart = null;
var langx=null;
var totalPageHeight = 0;
var divScrollEventAry = new Array();

function setupMenu() {
    return;
	// 漢堡bar點擊menu 展開/關閉
	var menu_btn = document.getElementById("menu_btn");
	var langx_btn = document.getElementById("menu_btn_langx");
	var langx_second_menu;

	

	menu_btn.onclick = function () {
		if (menu_btn.classList.contains("active")) {
			menu_btn.classList.remove("active");
		} else {
			menu_btn.classList.add("active");
		}
	};
	langx_btn.onclick = function () {
		if (langx_btn.classList.contains("active")) {
			langx_btn.classList.remove("active");
		} else {
			langx_btn.classList.add("active");
		}
	};
	if (innerWidth<=1024){
		langx_second_menu= document.getElementById("second_menu_ph");
		for (var i = 0; i < langx_second_menu.children.length; i++){
			if(langx_second_menu.children[i].getAttribute('value')==langx) {
				langx_second_menu.children[i].classList.add("active");
				langx_second_menu.children[i].selected=true;
				document.getElementById("lang_txt").innerHTML = langx_second_menu.children[i].innerHTML;
			}

		 }
		 

			langx_second_menu.onchange = function(e){
				if(!e.target.classList.contains("active")){
					//langx_second_menu.classList.add("active");
					// for (var j = 0; j < langx_second_menu.children.length; j++) {
					// 	langx_second_menu.children[j].classList.remove("active");
					// }
					e.target.classList.add("active");
					//e.target.selected=true;
					
					document.getElementById("lang_txt").innerHTML = e.target.innerHTML;
					langx = e.target.value;
				}
				if(window.location.href.indexOf("ti666")!=-1){
					window.location.href = "http://ti666.cvssp2017.com?langx="+langx
				}else if(window.location.href.indexOf("icash99")!=-1){
					window.location.href = "http://icash99.com?langx="+langx
				}else {
					window.location.href = "http://icash99.com?langx="+langx
				}
			};
		

	}else{
		 langx_second_menu = document.getElementById("second_menu_pc");
		 for (var i = 0; i < langx_second_menu.children.length; i++){
			if(langx_second_menu.children[i].getAttribute('value')==langx) {
				langx_second_menu.children[i].classList.add("active");
				document.getElementById("lang_txt").innerHTML = langx_second_menu.children[i].innerHTML;
			}

	 	}
		for (var i = 0; i < langx_second_menu.children.length; i++) {

			langx_second_menu.children[i].onclick = function(e){
				if(!e.target.classList.contains("active")){
					for (var j = 0; j < langx_second_menu.children.length; j++) {
						langx_second_menu.children[j].classList.remove("active");
					}
					e.target.classList.add("active");
					// document.getElementById("lang_title").innerHTML = e.target.innerHTML;
					document.getElementById("lang_txt").innerHTML = e.target.innerHTML;
					langx = e.target.getAttribute('value');
					 //langx=document.getElementById("lang_txt").value;
				}
				if(window.location.href.indexOf("ti666")!=-1){
					window.location.href = "http://ti666.cvssp2017.com?langx="+langx
				}else if(window.location.href.indexOf("icash99")!=-1){
					window.location.href = "http://icash99.com?langx="+langx
				}else {
					window.location.href = "http://ti666.cvssp2017.com?langx="+langx
				}
			};
		}

	}

	document.getElementById("send_btn").onclick = function () {
		getmail();
	};
	document.getElementById("menu_btn_hm1").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("hm_1").offsetTop);
	};
	document.getElementById("menu_btn_hm2").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("hm_2").offsetTop);
	};
	document.getElementById("menu_btn_hm3").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("hm_3").offsetTop);
	};
	document.getElementById("menu_btn_hm4").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("hm_4").offsetTop);
	};
	document.getElementById("menu_btn_move_about").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("move_about").offsetTop);
	};
	document.getElementById("menu_btn_hm6").onclick = function () {
		menu_btn.classList.remove("active");
		scrollTo(document.getElementById("hm_6").offsetTop);
	};
	document.getElementById("businese_btn").onclick = function () {
		scrollTo(document.getElementById("hm_4").offsetTop);
	};
	document.getElementById("menu_game_btn").onclick = function () {
		// document.getElementById("logindiv").classList.add("on");	
		initlogin();
		displayLoginDiv(true);
	};
	
}
function scrollTo(offset) {
	document.body.scrollTop = offset;
	document.documentElement.scrollTop = offset;
}
function setScollEvent() {
	for (var i = 0; i < document.body.children.length; i++) {
		var divScrollEvent = new Object();
		divScrollEvent["triggerDiv"] = document.body.children[i];
		divScrollEvent["triggerHeight"] = totalPageHeight + document.body.children[i].clientHeight / 2;
		divScrollEventAry.push(divScrollEvent);
		totalPageHeight += document.body.children[i].clientHeight;
	}
	// document.body.onscroll = function () {
	window.onscroll = function () {
		var bodyTop = 0;
		if (typeof window.pageYOffset != "undefined") {
			bodyTop = window.pageYOffset;

		} else if (typeof document.compatMode != "undefined"
			&& document.compatMode != "BackCompat") {
			bodyTop = document.documentElement.scrollTop;

		} else if (typeof document.body != "undefined") {
			bodyTop = document.body.scrollTop;
		}
		/*顯示出捲動後的高度值*/
		// console.log(bodyTop);
		var bodyHeight = document.body.clientHeight;

		for (var i = 1; i <= 6; i++) {
			var detectDiv = document.getElementById("hm_" + i);
			if (bodyTop + bodyHeight > detectDiv.offsetTop + detectDiv.clientHeight / 3 * 2) {
				// console.log("index " + i + "   " + bodyTop + "+" + detectDiv.clientHeight + " (" + detectDiv.clientHeight / 3 * 1 + ") > " + detectDiv.offsetTop);
				detectDiv.classList.add('active');
			}
		}
	};
}

function setBannerMouseEvent() {
	var move_about = document.getElementById("move_about");
	var banner_dots = document.getElementById("banner_dots");
	var bannerPrev = document.getElementById("bannerPrev");
	var bannerNext = document.getElementById("bannerNext");
	move_about.addEventListener("mouseenter", function () {
		bannePlay = false;
		if (banneStart != null) {
			clearInterval(banneStart);
			banneStart = null;
		}
	});

	move_about.addEventListener("mouseout", function () {
		bannePlay = true;
		if (bannePlay) {
			goPlayBanner();
		}
	});

	for (var i = 0; i < banner_dots.children.length; i++) {
		banner_dots.children[i].onclick = function (elem) { bannerDotClick(elem) };
	}

	bannerPrev.onclick = function () {
		var banner_dots = document.getElementById("banner_dots");
		var bannerDotLength = banner_dots.children.length;
		nowDot < 1 ? nowDot = 3 : nowDot--;
		removeAllBannerDot(banner_dots);
		if (nowDot > 0 && nowDot <= bannerDotLength - 1) {
			action_1();
		}
		else if (nowDot == 0) {
			// nowDot = 3;
			action_2();
		}
		goPlayBanner();
	};
	bannerNext.onclick = function () {
		var banner_dots = document.getElementById("banner_dots");
		var bannerDotLength = banner_dots.children.length;
		nowDot == bannerDotLength - 1 ? nowDot = 0 : nowDot++;
		removeAllBannerDot(banner_dots);
		if (nowDot > 0 && nowDot <= bannerDotLength - 1) {
			action_1();
		} else if (nowDot == 0) {
			nowDot = 4;
			action_2();
		}
		goPlayBanner();
	};
}

function activeBanner() {
	var banner_group = document.getElementById("banner_group");
	banner_group.classList.add('active');
	if (bannePlay) {
		goPlayBanner();
	}
}

var nowDot = 0;
var nowRecruitDot = 0;

function goPlayBanner() {
	var banner_dots = document.getElementById("banner_dots");
	var bannerDotLength = banner_dots.children.length;
	if (bannePlay) {
		if (banneStart != null) {
			clearInterval(banneStart);
		}
		banneStart = setInterval(function () {
			nowDot == bannerDotLength - 1 ? nowDot = 0 : nowDot++;
			removeAllBannerDot(banner_dots);
			if (nowDot > 0 && nowDot <= bannerDotLength - 1) {
				action_1();
			} else if (nowDot == 0) {
				nowDot = 4;
				action_2();
			}
		}, 6000);
	}
}

function removeAllBannerDot(dotsElem) {
	if (dotsElem != null) {
		var banner_dots = dotsElem;
		for (var i = 0; i < banner_dots.children.length; i++) {
			banner_dots.children[i].classList.remove('on');
		}
	}
}

function activeBannerDot(dotsElem, index) {
	if (dotsElem != null) {
		var banner_dots = dotsElem;
		for (var i = 0; i < banner_dots.children.length; i++) {
			if (i == index) {
				banner_dots.children[i].classList.add('on');
			} else {
				banner_dots.children[i].classList.remove('on');
			}
		}
	}
}

function bannerDotClick(event) {
	var banner_dots = document.getElementById("banner_dots");
	var bannerDotLength = banner_dots.children.length;
	var index = 0;		//0~3
	for (var i = 0; i < event.target.parentElement.children.length; i++) {
		if (event.target.parentElement.children[i] == event.target) {
			index = i;
		}
	}
	activeBannerDot(banner_dots, index);
	if (nowDot < bannerDotLength - 1) {
		nowDot = index;
		if (index > 0 && index <= bannerDotLength - 1) {
			nowDot = index;
			action_1();
		} else if (index == 0) {
			action_2();
		}
	} else if (nowDot == 3) {
		if (index > 0 && index <= bannerDotLength - 1) {
			nowDot = index;
			action_1();
		} else if (index == 0) {
			nowDot = 4;
			action_2();
		}
	}
}
//======mail送信======
function getmail(){
	var nameid = document.getElementById("nameid").value;
	var country = document.getElementById("country").value;
	var mail = document.getElementById("mail").value;
	var area = document.getElementById("area").value;
	var tel = document.getElementById("tel").value;
	var online_tel = document.getElementById("online_tel").children[0].value
	var message = document.getElementById("message").value;
	var gaming = document.getElementById("gaming").value;
	var subject = document.getElementById("subject").value;
	var content = document.getElementById("content").value;
	var param = "name="+nameid+"&country="+country+"&mail="+mail+"&area="+area+"&tel="+tel+"&online_tel="+online_tel+"&message="+message+"&gaming="+gaming+"&subject="+subject+"&content="+content;
	console.log(param);
	PostPHP("../app/api_mail.php", param);

}

// ====== 函式區塊 ======
function goTransform(bannerGroupElem, direct, page, time) {
	if (bannerGroupElem != null && (direct == "X" || direct == "Y")) {
		var banner_group = bannerGroupElem;
		banner_group.style = "transform:translate" + direct + "(-" + page * 100 + "%); transition:" + time + "s";
	}
}

function changeClass(index) {
	var banner_group = document.getElementById("banner_group").children;
	for (var i = 0; i < banner_group.length; i++) {
		if (i == index) {
			banner_group[i].classList.add("active");
		} else {
			banner_group[i].classList.remove("active");
		}
	}
}

function action_1() {
	var banner_dots = document.getElementById("banner_dots");
	var banner_group = document.getElementById("banner_group");
	goTransform(banner_group, "X", nowDot, 0.5);
	// setTimeout(function () { changeClass(nowDot + 1) }, 500);
	setTimeout(function () { changeClass(nowDot) }, 500);
	activeBannerDot(banner_dots, nowDot);
}
function action_2() {
	var banner_dots = document.getElementById("banner_dots");
	var banner_group = document.getElementById("banner_group");
	goTransform(banner_group, "X", nowDot, 0.5);
	setTimeout(function () {
		goTransform(banner_group, "X", 0, 0);
	}, 500);

	setTimeout(function () {
		changeClass(0);
		nowDot = 0;
	}, 510);

	activeBannerDot(banner_dots, 0);
}

var nowRecruitDot = 0
function goPlayRecruit() {
	if(banneRecruitStart != null){
		clearInterval(banneRecruitStart);
		banneRecruitStart = null;
	}
	banneRecruitStart = setInterval(function () {
		nowRecruitDot == 3 ? nowRecruitDot = 0 : nowRecruitDot++;
		execRecruit();
	}, 2000);
}

function execRecruit(){
	var banner_dots = document.getElementById("recruit_dots");
	var bannerDotLength = banner_dots.children.length;
	removeAllBannerDot(banner_dots);
	if (nowRecruitDot < bannerDotLength) {
		goTransform(recruit_group, "Y", nowRecruitDot, 1);
		activeBannerDot(banner_dots, nowRecruitDot);
	} else if (nowRecruitDot == bannerDotLength) {
		goTransform(recruit_group, "Y", nowRecruitDot, 1)
		activeBannerDot(banner_dots, 0);
		setTimeout(() => {
			nowRecruitDot = 0;
			goTransform(recruit_group, "Y", nowRecruitDot, 0);
		}, 1000);
	}
}

function recruitDotClick(event) {
	var banner_dots = document.getElementById("recruit_dots");
	var bannerDotLength = banner_dots.children.length;
	var index = 0;		//0~3
	for (var i = 0; i < event.target.parentElement.children.length; i++) {
		if (event.target.parentElement.children[i] == event.target) {
			index = i;
		}
	}
	nowRecruitDot = index;
	execRecruit();
	goPlayRecruit();
}

function setRecruitMouseEvent() {
	var banner_dots = document.getElementById("recruit_dots");
	var bannerDotLength = banner_dots.children.length;
	for (var i = 0; i < bannerDotLength; i++) {
		banner_dots.children[i].onclick = function (elem) { recruitDotClick(elem) };
	}
}
//使用json物件更換語系 預設語系帶中文(如果語系是空值)
function load_art(doc, artjson, langx) {
    if (langx == '' || langx==undefined || langx==null ) langx = "zh-tw";
    var json = artjson[langx];
    var bod = doc.body.innerHTML;
    for (var key in json) {
        bod = bod.replace(new RegExp('\\\*' + key + '\\\*', 'gi'), json[key]);
    }
    doc.body.innerHTML = bod;
    doc.body.style.display = "";
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
//送php檔
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

function initlogin(){
	var loginbtn = document.getElementById("loginbtn");
	// var loginclose = document.getElementById("loginclose");
	logindisplay("game");
	clearInput();
	initCur();

	// loginclose.onclick = function(){
	// 	displayLoginDiv(false);
	// };
	// acc.onclick = function () {
	// 	logindisplay("loginMem");
	// }
	// free.onclick = function () {
	// 	logindisplay("game");
	// }

	loginbtn.onclick = function(){
		logindemo();
	};
}

function logindisplay(type){
    return;
	var acc = document.getElementById("acc");
	var free = document.getElementById("free");
	var logindisplay = document.getElementById("logindisplay");
	free.classList.remove("on");
	acc.classList.remove("on");
	logindisplay.classList.remove("loginMem");
	logindisplay.classList.remove("game");
	if(type=="game"){
		free.classList.add("on");
		logindisplay.classList.add("game");
		return;
	}
	if(type=="loginMem"){
		acc.classList.add("on");
		logindisplay.classList.add("loginMem");
		return;
	}
}

function displayLoginDiv(boolean){
    return;
	var logindiv = document.getElementById("logindiv");
	if(boolean){
		logindiv.classList.add("on");
	}else{
		logindiv.classList.remove("on");
	}
}

function initCur(){
    var logindisplay = document.getElementById("logindisplay");
    var curdiv = logindisplay.querySelectorAll(".normal_select")[0];
	var  curtitle= logindisplay.querySelectorAll(".select_showPC")[0];
	var curli = logindisplay.querySelectorAll("li");
	curtitle.onclick = function(){
		if(curdiv.classList.contains("on")){
			// curdiv.classList.remove("on");
		}else{
			curdiv.classList.add("on");
		}
	}

	for(var i = 0; i<curli.length;i++){
		(function(){
			var cur = curli[i];
				if(cur.getAttribute("data-type")=="cur"){
				cur.onclick = function(){
					clickCur(cur);
				}
			}
		})();
	}
	curli[0].onclick();
}

function clickCur(ddd){
	var logindisplay = document.getElementById("logindisplay");
	var curdiv = logindisplay.querySelectorAll(".normal_select")[0];
	var curselect = logindisplay.querySelectorAll("select")[0];
	var curtitle = logindisplay.querySelectorAll(".select_showPC")[0];
    var curli = logindisplay.querySelectorAll("li");
    
    for(var i = 0; i<curli.length;i++){
        var cur = curli[i];
        if(cur.getAttribute("data-value")==ddd.getAttribute("data-value"))cur.classList.add("on");
        else cur.classList.remove("on");
    }
	var a =  ddd.getAttribute("data-value");
	curselect.value=a;
	curtitle.innerHTML=ddd.innerHTML;
	curdiv.classList.remove("on");
}

function clearInput(){
	var logindisplay = document.getElementById("logindisplay");
	var login_input = logindisplay.querySelectorAll("input");
	login_input[0].value="";
	login_input[1].value="";
}
function logindemo(){
	var logindisplay = document.getElementById("logindisplay");
	var login_input = logindisplay.querySelectorAll("input");
	var curselect = logindisplay.querySelectorAll("select")[0];
	// if(!logindisplay.classList.contains("loginMem")){
	// 	lazyDemo();
	// }else{
	// 	lazyAccLogin(login_input[0].value,login_input[1].value,curselect.value);
    // }
    if(document.getElementById("loginmsg"))document.getElementById("loginmsg").classList.remove("on");
    lazyAccLogin(login_input[0].value,login_input[1].value,curselect.value);
    displayLoginDiv(false);	
    
}

