<?php
header('Content-Type:application/json');
session_start();

if(isset($_GET['save'])){
    $_SESSION['tasks']=file_get_contents('php://input');
}
echo $_SESSION['tasks'];