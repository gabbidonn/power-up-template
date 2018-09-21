
<?php

include_once (__DIR__.'/tracRPC.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$credentials = array('username' => 'delta.api' , 'password' => 'D3Lt445c!');
if(isset($_POST["multicall"])) {
    $credentials["multiCall"] = $_POST["multicall"]; 
}

$storyID = $_GET["storyID"];
$webHook = $_GET["webHook"];

$trac = new \TracRPC\TracRPC('https://platinum.deltafs.net/trac/login/jsonrpc', $credentials);
$method = $_POST["method"];
$params = $_POST["params"];
    

if(isset($storyID) && isset($webHook)) 
{
    // Story id involved for webhook - lets set it up.
    
}

$trac->doRequest($method, $params);

echo json_encode($trac->getResponse());