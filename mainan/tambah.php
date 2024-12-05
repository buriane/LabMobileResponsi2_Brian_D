<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$nama = trim($data['nama']);
$deskripsi = trim($data['deskripsi']);

if (empty($nama) || empty($deskripsi)) {
    $response = ['status' => 'error', 'message' => 'Nama dan deskripsi tidak boleh kosong'];
    echo json_encode($response);
    exit;
}

$query = mysqli_query($con, "INSERT INTO mainan(nama,deskripsi) VALUES('$nama','$deskripsi')");

if ($query) {
    $response = ['status' => 'success', 'message' => 'Data berhasil ditambahkan'];
} else {
    $response = ['status' => 'error', 'message' => mysqli_error($con)];
}

echo json_encode($response);
?>