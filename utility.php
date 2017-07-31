<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
function connectDatabase() {
  try {
      $db = new PDO('mysql:host=localhost;dbname=pendu', "root", "");
      return $db;
  } catch (PDOException $e) {
      print "Erreur !: " . $e->getMessage() . "<br/>";
      exit("script dies @connectDatabase");
  }
}
connectDatabase();
function debug($val, $mode = 0) {
    echo '<pre style="background:#' . substr(md5(rand()), 0, 6) . '">';
    if ($mode === 1) {
        var_dump($val);
    } else {
        print_r($val);
    }
    echo "</pre>";
}
function debugX($val, $mode = 0) {
    echo '<pre style="background:#' . substr(md5(rand()), 0, 6) . '">';
    if ($mode === 1) {
        var_dump($val);
    } else {
        print_r($val);
    }
    echo "</pre>";
    exit;
}