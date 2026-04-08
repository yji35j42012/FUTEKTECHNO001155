<?php
//0727 ice. v2
// $url = "https://api.iabc365.com/app/control_API/agents/api_doaction.php";
// $url = "http://agti566.cvssp2017.com/app/control_API/agents/api_doaction.php";
// $url = "http://agiiti566.cvssp2017.com/app/control_API/agents/api_doaction.php";

$domain =  $_SERVER['SERVER_NAME'];
$phpVer = PHP_VERSION;

foreach ($_REQUEST as $key => $value) {
    if(is_array($value))   {
      foreach($value as $mkey => $mval){
        $value[$mkey] = $mval;
      }
      try{
        $$key = $value;
      }catch(Exception $e){
        $$key = "";
      }
    }else{
      try{
        $$key = $value;
      }catch(Exception $e){
        $$key = "";
      }
    }
}

$act="getmail";
if(empty($name))$name='';
if(empty($country))$country='';
if(empty($mail))$mail='';
if(empty($area))$area='';
if(empty($tel))$tel='';
if(empty($online))$online='';
if(empty($message)) $message='';
if(empty($gaming ))$gaming='';
if(empty($subject)) $subject='';
if(empty($content))$content='';
$obj=array();
if($act=="getmail"){
    // if(empty( nameid )= document.getElementById("nameid").value;
	// if(empty( country) = document.getElementById("country").value;
	// if(empty( mail = )document.getElementById("mail").value;
	// if(empty( area = )document.getElementById("area").value;
	// if(empty( tel = d)ocument.getElementById("tel").value;
	// if(empty( online_)tel = document.getElementById("nameid").online_tel;
	// if(empty( message) = document.getElementById("message").value;
	// if(empty( gaming )= document.getElementById("gaming").value;
	// if(empty( subject) = document.getElementById("subject").value;
	// if(empty( content) = document.getElementById("content").value;
    //{"data":{"wechat":"21345423","email":"asdfgggg@afddf.eee.com","Content":"內容測試",
    //"Country":"台灣","Tel":"0921432123","Subject":"測試測試","Name":"QQQQQ"},
    //"cmdName":"sendEmail","cmdNo":"123"}
    $ip = "192.168.201.99";
    $port = "9928";
    if($obj["data"]==null )$obj["data"]=array();
    $obj["data"]["WeChat"]=defend_SQL_injection($online_tel) . " : ".defend_SQL_injection($message);
    $obj["data"]["Name"]=defend_SQL_injection($name);
    $obj["data"]["Country"]=defend_SQL_injection($country);
    $obj["data"]["Email"]=defend_SQL_injection($mail);
    $obj["data"]["Content"]=defend_SQL_injection($content);
    $obj["data"]["Tel"]=defend_SQL_injection($area).defend_SQL_injection($tel);
    $obj["data"]["Subject"]=defend_SQL_injection($subject);
    $obj["data"]["FavoriteGame"]=defend_SQL_injection($gaming);
    $obj["cmdName"]="sendEmail";
    $obj["cmdNo"]="123";

    $jsonparame = urlencode(json_encode($obj));
    //echo $jsonparame;
    $jsonparame=javaConnnection($jsonparame, $ip, $port, true);
    if($jsonparame) echo "送出成功";
    else echo "送出失敗";
}
exit;
function javaConnnection($command, $ip, $port, $back = false){
    $get = "";
    $fp = fsockopen($ip, $port, $errno, $errstr, 5);
    if (!$fp) {
        return "Server error";
       // echo "<script>alert('$errno:$errstr');</script>";
    } else {
        //return $command;
        fwrite($fp, $command . "\n");
        if ($back) {
            while (!feof($fp)) {
                $get .= fgets($fp, 256);
                if (strpos($get, "\n") > -1) {
                    break;
                }

                //echo $get;
            }
        }
        fclose($fp);
    }
    return $get;
}
function defend_SQL_injection($word){
    // $word = preg_replace('/=/','',$word);
    // $word = preg_replace('/--/','',$word);
    // $word = preg_replace('/%/','',$word);
    // $word= preg_replace('/\'/','',$word);
    // $word= preg_replace('/\*/','',$word);
    // $word= preg_replace('/ OR /','',$word);
    // $word= preg_replace('/ or /','',$word);
    // $word= preg_replace('/#/','',$word);
    // //$word= eregi_replace('/','',$word);
    // //$word= stripcslashes($word);
    // return $word;	
    $word = trim($word);
    $word = preg_replace('/\"/','',$word);
    $word = preg_replace('/\'/','',$word);
    $word = preg_replace('/#/','',$word);
    $word = preg_replace('/[\\\\]/','',$word);
    $word = preg_replace('/=/','',$word);
    $word = preg_replace('/--/','',$word);
    $word = preg_replace('/\(/','',$word);
    $word = preg_replace('/\)/','',$word);
    $word = preg_replace('/%/','',$word);
    $word = preg_replace('/\*/','',$word);
    $word = preg_replace('/\|\|/i','',$word);
    // $word = preg_replace('/\bor \b/i','',$word);
    $word = preg_replace('/\bor\b/i','',$word);
    $word = preg_replace('/\band\b/i','',$word);
    $word = preg_replace('/\bunion\b/i','',$word);
    $word = preg_replace('/\bupdate\b/i','',$word);
    $word = preg_replace('/\bdelete\b/i','',$word);
    $word = preg_replace('/\bselect\b/i','',$word);
    $word = preg_replace('/\bascii\b/i','',$word);
    $word = preg_replace('/_schema/i','',$word);
    $word = preg_replace('/\s+/','&nbsp;',$word); //在PHP  把它顯示出來html_entity_decode($$key)
    return $word;	
}
?>