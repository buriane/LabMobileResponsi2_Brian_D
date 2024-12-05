<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$con = mysqli_connect("localhost", "root", "", "responsi2") or die("koneksi gagal");
if (!$con) {
    die(json_encode([
        'status_login' => 'gagal',
        'error' => 'Koneksi database gagal: ' . mysqli_connect_error()
    ]));
}
?>