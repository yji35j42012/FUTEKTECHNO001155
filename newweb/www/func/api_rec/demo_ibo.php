<?php
$logPath= substr($_SERVER['DOCUMENT_ROOT'],0,strlen($_SERVER['DOCUMENT_ROOT'])-3)."lunach_api_demo_log";
$rday = 2 ; //log 保留天數
unlinkTxt_demo($logPath,$rday);//檢查檔案是否有超過七天以前的(只保留七天內的)
$s_time = time();
//一進來寫紀錄
writeLog ($logPath,"[".date("Y-m-d H:i:s")."][START_". $s_time ."] | REMOTE_ADDR :".$_SERVER['REMOTE_ADDR']." code: ".file_get_contents('php://input')."\n");
define("NOT_LOGIN","Y");//是否要檢查
$domain =  $_SERVER['SERVER_NAME'];
//========== 正規化參數 start ==========
$variable = Array(
    "smstime" => "string",
    "allms" => "string",
    "allmsfile" => "string",
    "uid" => "string",
    "langx" => "string",
    "regcode" => "string",
    "apicurrency" => "string",
    "apiusername" => "string",
    "apipswd" => "string",
);
/* //預設的帳號密碼
// old 帳號用
$api_loging_data_1 = Array(
    "username"=>"infoiigame",
    "sKey"=>"ta73DHGsJaL1GeHF",
    "aid"=>"761",
    "pswd"=>"aa1234",
);
// info 帳號用
$api_loging_data_2 = Array(
    "username"=>"oldiigame",
    "sKey"=>"k0Xb3SdAdgQygtAP",
    "aid"=>"218",
    "pswd"=>"aaa1234",
);

$api_ip_port = Array(
    "ip"=>"192.168.80.19",
    "port"=>"41030",//old
    "port"=>"40030",//info
);
*/
if(preg_match("/icash99.com/",$domain)){
    // 線上 隨機帳號用
    $api_loging_data_1 = Array(
        "username"=>"sme",
        "sKey"=>"J3wby7T71SzCoUD5",
        "aid"=>"1137",
        "pswd"=>"aa1234"
    );
    // 線上 固定帳號用
    $api_loging_data_2 = Array(
        "username"=>"sme2",
        "sKey"=>"g2NFWcO3DtzkChEN",
        "aid"=>"1625",
        "pswd"=>"aa1234",
    );
    $api_ip_port = Array(
        "ip"=>"208.87.166.132",
        "ip"=>"66.133.94.132",
        // "ip"=>"api.ibocity3000.com",
        "port"=>"10030",
    );
}else if(preg_match("/203.170.22.60/",$domain)){ //直接登入帳號頁面 獨立ip
    // 線上 隨機帳號用
    $api_loging_data_1 = Array(
        "username"=>"smecredit",
        "sKey"=>"6bibJftOZIE3zTWf",
        "aid"=>"1626",
        "pswd"=>"bb1234"
    );
    // 線上 固定帳號用
    $api_loging_data_2 = Array(
        "username"=>"smecredit",
        "sKey"=>"6bibJftOZIE3zTWf",
        "aid"=>"1626",
        "pswd"=>"bb1234",
    );
    $api_ip_port = Array(
        "ip"=>"208.87.166.132",
        "ip"=>"66.133.94.132",
        // "ip"=>"api.ibocity3000.com",
        "port"=>"10030",
    );   
}else{
    // 測試機 隨機帳號用
    $api_loging_data_1 = Array(
        "username"=>"oldiigame",
        "sKey"=>"k0Xb3SdAdgQygtAP",
        "aid"=>"218",
        "pswd"=>"aaa1234",
    );
    // 測試機 固定帳號用
    $api_loging_data_2 = Array(
        "username"=>"oldiigame",
        "sKey"=>"k0Xb3SdAdgQygtAP",
        "aid"=>"218",
        "pswd"=>"aaa1234",
    );
    $api_ip_port = Array(
        "ip"=>"192.168.80.19",
        "port"=>"41030",//old
        "port"=>"40030",//info
    );
}


$cur_tracefer = Array(
		"RMB"=> "5000",
		"HKD"=> "5000",
		"USD"=> "1000",
		"MYR"=> "2500",
		"SGD"=> "2000",
		"THB"=> "2500",
		"GBP"=> "1000",
		"JPY"=> "10000",
		"EUR"=> "1000",
		"IND"=> "5000",
		"NTD"=> "20000",
		"GOD"=> "5000",
		"CNY"=> "15000",
		"VND"=> "15000",
		"KRW"=> "1000000",
		"INR"=> "50000",
		"USDT"=> "1000",
		"BRL"=> "5000",
        "PHP"=> "40000",
        "MXN"=> "10000",
);



$EMNU_langx = Array("zh-tw" => true,"zh-cn" => true,"en-us" => true);
$code = file_get_contents('php://input');//取得JSON的內容
if(empty($code) ){
    foreach ($_REQUEST as $key => $value) {
        if(!empty($_COOKIE[$key]))continue;   // 如果沒有使用到 cookie 的話
        $$key = $value;
    }
}
$tmp_J = json_decode($code,true);
$langx = $tmp_J["langx"];
$apicurrency = $tmp_J["apicurrency"];
$username = "";
$pswd = "";
// CS- Joanne 20220930 帶入語系 請幫都帶入簡體語系 謝謝
$langx = "zh-cn";

$out = array();
$dataAry = array();
//判斷要用哪個代理
if(empty($tmp_J["apiusername"]) ){
    $api_loging_data = $api_loging_data_1;
}else {
    $api_loging_data = $api_loging_data_2;
}

$rs = AGLogin($api_loging_data);
$rs_data = json_decode($rs,true);
$respcode = $rs_data["respcode"];
if($respcode != "0000"){
    // echo "alert('" . $chk_rs_obj["Error"] . "')";
    $out["url"] = "1x999";
    $out["code"] = "1x999";
    $out["error_msg"] = $rs_data["Error"];
    echo json_encode($out);
    exit;
}
$token = $rs_data["token"];
//註冊
if(empty($tmp_J["apiusername"]) ){
    $username =  makeAccount();//自動創的帳號為 隨機亂碼
    $pswd = "666666";//密碼固定六碼
}else{
    $username = $tmp_J["apiusername"];
    $pswd = $tmp_J["apipswd"];
    // $username = $apiusername;
    // $pswd  = $apipswd;
    $chk_rs = showMember($username,$token,$api_loging_data);
    $chk_rs_obj = json_decode($chk_rs,true);
    // {"userdata":{"user_gold":"0","user_id":"2005","user_name":"kvictor","user_enable":"Y","user_currency":"RMB"},"method":"ShowMember","responeid":"1310415540","respcode":"0000","status":"success","timestamp":"1664438796181"}
    if($chk_rs_obj["respcode"] != "0000"){
        if(strpos($chk_rs_obj["Error"], "currency") ){
            // echo "alert('選擇正確的幣別')";
            $out["url"] = "1x001";
            $out["code"] = "1x001";
            $out["error_msg"] = $chk_rs_obj["Error"];
            $out["error"] = $chk_rs_obj;
            echo json_encode($out);
            exit;
        }else if (strpos($chk_rs_obj["Error"], "ShowMember")){
            // echo "alert('帳號密碼錯誤,請重新輸入')";
            $out["url"] = "1x002";
            $out["code"] = "1x002";
            $out["error_msg"] = $chk_rs_obj["Error"];
            $out["error"] = $chk_rs_obj;
            echo json_encode($out);
            exit;
        }else if (strpos($chk_rs_obj["Error"], "LaunchGame")){
            // echo "alert('帳號密碼錯誤,請重新輸入')";
            $out["url"] = "1x002";
            $out["code"] = "1x002";
            $out["error_msg"] = $chk_rs_obj["Error"];
            $out["error"] = $chk_rs_obj;
            echo json_encode($out);
            exit;
        }else if (strpos($chk_rs_obj["Error"], "can not be AGLogin :Password wrong input few times…tact upper level to relieve the password blockade")){
            $out["url"] = "1x003";
            $out["code"] = "1x003";
            $out["error_msg"] = $chk_rs_obj["Error"];
            $out["error"] = $chk_rs_obj;
            echo json_encode($out);
            exit;
        }else{
            // echo "alert('" . $chk_rs_obj["Error"] . "')";
            $out["url"] = "1x999";
            $out["code"] = "1x999";
            $out["error_msg"] = $chk_rs_obj["Error"];
            $out["error"] = $chk_rs_obj;
            echo json_encode($out);
            exit;
        }
    }

}

// echo "username:".$username . " pswd:".$pswd;
$log_rs = loginGame($username,$pswd,$apicurrency,$token,$langx,$api_loging_data);

if(empty($tmp_J["apiusername"]) ){
    members_Deposit($username,$apicurrency,$token,$langx,$api_loging_data,$cur_tracefer[$apicurrency]);
}


$log_rs_obj = json_decode($log_rs,true);
// print_r($log_rs_obj );
if($log_rs_obj["respcode"] != "0000"){
    if(strpos($log_rs_obj["Error"], "currency") ){
        // echo "alert('選擇正確的幣別')";
        $out["url"] = "1x001";
        $out["code"] = "1x001";
        $out["error_msg"] = $log_rs_obj["Error"];
        $out["error"] = $log_rs_obj;
        echo json_encode($out);
        exit;
    }else if (strpos($log_rs_obj["Error"], "ShowMember")){
        // echo "alert('帳號密碼錯誤,請重新輸入')";
        $out["url"] = "1x002";
        $out["code"] = "1x002";
        $out["error_msg"] = $log_rs_obj["Error"];
        $out["error"] = $log_rs_obj;
        echo json_encode($out);
        exit;
    }else if (strpos($log_rs_obj["Error"], "LaunchGame")){
        // echo "alert('帳號密碼錯誤,請重新輸入')";
        $out["url"] = "1x002";
        $out["code"] = "1x002";
        $out["error_msg"] = $log_rs_obj["Error"];
        $out["error"] = $log_rs_obj;
        echo json_encode($out);
        exit;
    }else if (strpos($log_rs_obj["Error"], "can not be AGLogin :Password wrong input few times…tact upper level to relieve the password blockade")){
        $out["url"] = "1x003";
        $out["code"] = "1x003";
        $out["error_msg"] = $log_rs_obj["Error"];
        $out["error"] = $log_rs_obj;
        echo json_encode($out);
        exit;
    }else{
        // echo "alert('" . $log_rs_obj["Error"] . "')";
        $out["url"] = "1x999";
        $out["code"] = "1x999";
        $out["error_msg"] = $log_rs_obj["Error"];
        $out["error"] = $log_rs_obj;
        echo json_encode($out);
        exit;
    }
}


$out["url"] = $log_rs_obj["launchgameurl"];
$out["username"] = $log_rs_obj["memname"];
$out["code"] = "0000";
echo json_encode($out);
$e_time = time();
//完成寫紀錄
// writeLog ($logPath,"[".date("Y-m-d H:i:s")."][END___". $s_time ."] | REMOTE_ADDR :".$_SERVER['REMOTE_ADDR']. " | s_time=". $s_time . " | e_time=" . $e_time ." | " . ($e_time-$s_time) . "sec |" ."\n". " Response: ". $url ."\n");
writeLog ($logPath,"[".date("Y-m-d H:i:s")."][END___". $s_time ."] | REMOTE_ADDR :".$_SERVER['REMOTE_ADDR']. " | s_time=". $s_time . " | e_time=" . $e_time ." | " . ($e_time-$s_time) . "sec |" ."\n". " Response: ". $log_rs ."\n");
exit;

//--------------------------------------------------------------------------------------------------------------------
//自動產生帳號
function makeAccount(){
    $originalArray = getChar();
    $count=count($originalArray)*1;
    $str = "";
    $range = rand(5,7);
    for ($i=0;$i<$range;$i++){
        do{
            $num=floor(rand(1,$count));
        }while($originalArray[$num]==null);
        $str .= $originalArray[$num];
        $originalArray[$num]=null;
    }
    //判斷是否全數字英文或是只有一個數字或是只有一個英文字母 直接替換
    //全數字
    if(preg_match("/^\d*$/",$str)) $str = makeAccount();
    //只有一個數字
    if(preg_match("/^[a-z]*?\d{1}[a-z]*?$/",$str)) $str = makeAccount();
    //只有一個英文字母
    if(preg_match("/^\d*?[a-z]{1}\d*?$/",$str)) $str = makeAccount();
    //全英文
    if(preg_match("/^[a-z]*$/",$str)) $str = makeAccount();
    return $str;
}
//產生 數字與英文變數陣列
function getChar(){
    $_num = array(0,1,2,3,4,5,7,6,8,9);
    $_alphabet = array("a","b","c","d","e","f","g","h","k","m","n","p","q","r","s","t","w","x","y","z");//沒i j l o u v
    $char = array();
    for($i = 0 ; $i < 3 ; $i++){    //在陣列中存放 3組數字 與 3組英文
        foreach($_num as $key => $value){
            array_push($char,$value);
        }
        foreach($_alphabet as $key => $value){
            array_push($char,$value);
        }
    }
    return $char;
}
//CreateMember
function createMember ($username,$pswd,$currency,$token,$api_loging_data){
    $timestamp = time();
    $tmp_request = '{"password":"' . $pswd .'","memname":"' . $username .'","currency":"' . $currency .'","token":"' . $token .'","timestamp":"' . $timestamp .'"}';
    $tmp_request_encode = encode($tmp_request,$api_loging_data["sKey"]);
    $code = '{"Method":"CreateMember","AGID":"' . $api_loging_data["aid"] . '","Request":"' . $tmp_request_encode . '"}';
    return sendCode($code,$api_loging_data["sKey"]);
}
//Deposit
function members_Deposit($username,$currency,$token,$langx,$api_loging_data,$gold){
    // {"Request":{"method":"Deposit","memname":"aaallen03","amount":"1000","payno":"1o929ajp01","token":"76bb7368mf1l8a4xw","timestamp":1557221123660},"Method":"Deposit","AGID":"103"}
    $timestamp = time();
    $tmp_request = '{"method":"Deposit","memname":"' . $username .'","amount":"' . $gold .'","payno":"","token":"' . $token .'","timestamp":' . $timestamp .'}';
    $tmp_request_encode = encode($tmp_request,$api_loging_data["sKey"]);
    $code = '{"Method":"Deposit","AGID":"' . $api_loging_data["aid"] . '","Request":"' . $tmp_request_encode . '"}';
    return sendCode($code,$api_loging_data["sKey"]);
}
//ShowMember
function showMember($chkuser,$token,$api_loging_data){
    $timestamp = time();
    $tmp_request = '{"method":"ShowMember","memname":"' . $chkuser . '","token":"' . $token .'","timestamp":"' . $timestamp . '"}';
    $tmp_request_encode = encode($tmp_request,$api_loging_data["sKey"]);
    $code = '{"Method":"ShowMember","AGID":"' . $api_loging_data["aid"] . '","Request":"' . $tmp_request_encode . '"}';
    return sendCode($code,$api_loging_data["sKey"]);
}
//進遊戲
function loginGame ($username,$pswd,$currency,$token,$langx,$api_loging_data){
    $timestamp = time();
    $tmp_request = '{"memname":"' . $username .'","password":"' . $pswd .'","machine":"PC","langx":"' . $langx . '","remoteip":"' . $_SERVER["REMOTE_ADDR"] . '","currency":"' . $currency .'","token":"' . $token .'","timestamp":' . $timestamp . ',"isSSL":"N"}';
    $tmp_request_encode = encode($tmp_request,$api_loging_data["sKey"]);
    // echo $tmp_request;
    $code = '{"Method":"LaunchGame","AGID":"' . $api_loging_data["aid"] . '","Request":"' . $tmp_request_encode . '"}';
    // echo $code;
    return sendCode($code,$api_loging_data["sKey"]);
}
//send code
function sendCode ($cmd,$key){
    Global $api_ip_port;
    $rs = javaConnnection($cmd,$api_ip_port["ip"],$api_ip_port["port"],true);
    // echo "rs:".$rs." IP:".$api_ip_port["ip"]." port:".$api_ip_port["port"];
    $tmp_encode_reponse = decode($rs,$key);
    return $tmp_encode_reponse;
}
//寫紀錄檔function
function writeLog ($path,$string){
    if(!is_dir($path."/".date("Y-m-d"))){mkdir($path."/".date("Y-m-d"),0777); }
    $file = fopen($path."/".date("Y-m-d")."/lunach_api_demo_log.txt",'a');
    fwrite($file, $string, strlen($string));

    fclose($file);

}
//刪除七天以前的txt
function unlinkTxt_demo($path,$rday){
    $files = glob($path . '/*', GLOB_MARK);
    foreach ($files as $file) {
        if (date("Y-m-d H:i:s",filemtime($file)) < date("Y-m-d H:i:s",mktime(0,0,0,date("m"),date("d")-$rday,date("Y")))) {
            $subfiles = glob($file . '/*', GLOB_MARK);
            foreach ($subfiles as $subfile) {
                    unlink($subfile);//只要日期小於七天前的都砍掉
            }
            rmdir($file);//只要日期小於七天前的都砍掉
        } else {
            //print "false";
        }
    }
}
//agloging
function AGLogin($api_loging_data){
    $timestamp = time();
    $tmp_request = '{"username":' . $api_loging_data["username"] . ',"password":"' . $api_loging_data["pswd"] .'","timestamp":"' . $timestamp . '"}';
    // echo "tmp_request:".$tmp_request;
    $tmp_request_encode = encode($tmp_request,$api_loging_data["sKey"]);
    $code = '{"Method":"AGLogin","AGID":"' . $api_loging_data["aid"] . '","Request":"' . $tmp_request_encode . '"}';
    // echo "encode:".$code;
    return sendCode($code,$api_loging_data["sKey"]);
}
//加密
function encode($data,$key){
    $encrypt = openssl_encrypt($data, 'AES-128-ECB', $key, OPENSSL_RAW_DATA);
    $encrypt_text = base64_encode($encrypt);
    return $encrypt_text;
}
//解密
function decode($data,$key){
    $encrypt = base64_decode($data);
    $data = openssl_decrypt($encrypt, 'AES-128-ECB', $key, OPENSSL_RAW_DATA);
    return $data;
}
//javaconnect
function javaConnnection($command,$ip,$port,$back=false){
	$get="";
	$fp = fsockopen($ip, $port, $errno, $errstr, 5);
	if (!$fp) {
		return "Server error";
		//echo "<script>alert('$errno:$errstr');</script>";
	} else {
		fwrite($fp, $command."\n");
		if($back){
			while (!feof($fp)) {
				$get.= fgets($fp, 256);
				if(strpos($get , "\n") > -1) break;
				//echo $get;
			}

		}
		fclose($fp);
 	}
	return trim($get);
}

?>