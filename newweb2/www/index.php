<?php
$domain =  $_SERVER['SERVER_NAME'];
//192.168.80.51 測試機
//203.170.22.60 線上
if(preg_match("/192.168.80.51/",$domain) || preg_match("/203.170.22.60/",$domain)){
    // include("./index.html");
    include("./tpl/login_curr.html");
}else{
    include("./index.html");
}



