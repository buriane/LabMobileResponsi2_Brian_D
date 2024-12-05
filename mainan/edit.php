<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = trim($data['id']);
$nama = trim($data['nama']);
$deskripsi = trim($data['deskripsi']);

$query = mysqli_query($con, "UPDATE mainan SET nama='$nama', deskripsi='$deskripsi' WHERE id='$id'");

if ($query) {
    $response = ['status' => 'success', 'message' => 'Data berhasil diubah'];
} else {
    $response = ['status' => 'error', 'message' => mysqli_error($con)];
}

echo json_encode($response);
?>