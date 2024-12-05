<?php
require 'koneksi.php';

$data = [];
$query = mysqli_query($con, "SELECT * FROM mainan WHERE nama IS NOT NULL AND deskripsi IS NOT NULL AND nama != '' AND deskripsi != '' ORDER BY id DESC");

while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
}

echo json_encode($data);
?>