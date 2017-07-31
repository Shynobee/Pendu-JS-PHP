window.onload = function () {

    "use strict";
    var word;
    var hangman = document.getElementById('hangMan');
    var hang = document.querySelectorAll(".hang");
    var divUnit = document.querySelectorAll(".divUnit");
    var divElem = document.getElementById("divElem");
    var butWord = document.getElementById("button01");
    var pre = document.getElementById("pre");
    var entree = document.getElementById("entree");
    var alpha = document.querySelectorAll(".alpha");

    alphaBut();
    butWord.onclick = postWord;
    startGame();



    function postMot() {
        var xhr, fd;
        fd = new FormData();
        fd.append("create_word", entree.value);
        xhr = new XMLHttpRequest();
        xhr.open("POST", "api.php");

        xhr.send(fd);
    };

    /*function getViaAjax() {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open("GET", "api.php", "get_word");
        
        xhr.send();
    };*/

    function getWord() {
        $.get("api.php", { action: "get_word" }, function parse(res) {
            displayWord(JSON.parse(res));
        });
    }

    function displayWord(word) {
        var div, i;

        for (i = 0; i < word.length; i += 1) {
            console.log(word[i]);
            div = document.createElement("div");
            div.classList.add("divUnit");
            divElem.appendChild(div);
        }
    }

    function startGame() {
        document.getElementById("button02").onclick = function () {
            if (window.getComputedStyle(document.getElementById('game')).display == 'none') {
                document.getElementById("game").style.display = "block";
                getWord();
            } else {
                document.getElementById("game").style.display = "none";
            }
        }
    }

    function postWord() {
        if (entree.value.length >= 4) {
            postMot();
            //getViaAjaxJQ();  
        }
    }

    //console.log("ici");
    function displayLetter() {
        console.log(this.textContent);
    }

    function alphaBut() {
        for (var i = 0; i < alpha.length; i++) {
            alpha[i].onclick = checkLetter;
        }
    }

    function checkLetter() {
        var letter = this.textContent.toLowerCase();
        $.get("api.php", { action: "get_letter", letter: letter }, function (res) {
            // console.log("ici");
            res = JSON.parse(res)

            res.forEach(function (elem) {
                if ($('.divUnit')[elem].textContent !== letter) {
                    $('.divUnit')[elem].append(letter);
               }
            }, this);
                var win = true;
            $('.divUnit').each(function (pos, elem) {
                if (!elem.textContent) {
                    win = false;
                } 
            }, this);
            if (win === true) {
                alert('You Win !!!') ? "" : location.reload();   
            }   
        });
    }
}
