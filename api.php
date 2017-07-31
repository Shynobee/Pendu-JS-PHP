<?php include_once("utility.php");

$db = connectDatabase();

//$_SESSION[]

//debug($_POST);

if (isset($_POST["create_word"])) {
    createWord();
}

if (isset($_GET["action"]) && $_GET["action"] == "get_word") {
    getWord();
}

if (isset($_GET["action"]) && $_GET["action"] == "get_letter") {
    checkWord($_GET["letter"]);
}

function createWord() {
    global $db;
    //debugX('yata !');
    $req = $db->prepare("INSERT INTO pendu (mot) VALUES (:mot)");

    $req->bindParam(':mot', $_POST["create_word"]);

    $req = $req->execute();
    //debugX($res);
}

function getWord() {
    global $db;
   
    /*$req = $db->prepare("SELECT mot FROM pendu ORDER BY RAND() LIMIT 1");
    $req->execute();
    $res = $req->fetch(PDO::FETCH_OBJ);*/
    $res = "josee";
    $_SESSION["active_word"] = $res;
    
    //debugX($res);
    //debug($_SESSION);
    echo json_encode($res);
}

function checkWord($letter) {
    $results = array();// stocker dans results toutes les positions de la lettre dans le mot
    $word = $_SESSION["active_word"];

    for ($i = 0; $i < strlen($word); $i++) {
        
        if ($word[$i] === $letter) {
            $results[] = $i;
        }
    }
    echo json_encode($results);
}