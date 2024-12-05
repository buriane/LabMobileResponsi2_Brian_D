<?php
require 'koneksi.php';

$id = $_GET['id'];
$query = mysqli_query($con, "SELECT * FROM mainan WHERE id='$id'");
$data = mysqli_fetch_object($query);

echo json_encode($data);
?>