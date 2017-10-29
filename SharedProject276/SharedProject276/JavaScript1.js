function Game15(row, col, w, h) { //class specks
    this.row = row;
    this.col = col;
    this.sumCell = this.row * this.col;
    this.w = w;
    this.h = h;
    this.firstStep = true;  //to determine the first step
    this.clock = 0;
    this.timerId;
    this.move = 0;

    this.startGame =
    function () {
        Mas = new Array();  //buttons values
        for (var i = 0; i < (this.sumCell - 1) ; i++) {
            Mas[i] = i + 1;
        }
        //  $("<div/>", { id: "canv" }).appendTo("body");
        //create gamefield (15 - margin, 5 - between buttons)
        $("<div/>", { id: "canv" }).appendTo("body").css({
            "width": (30 + this.col * (this.w + 1) - 1),
            "height": (30 + this.row * (this.h + 1) - 1),
        });

        if ($("#canv").width() >= innerWidth || $("#canv").height() >= innerHeight) {
            $("#canv").css({
                "left": 0,
                "top": 40
            });
        }
        else {
            $("#canv").css({
                "left": innerWidth / 2 - $("#canv").width() / 2,
                "top": innerHeight / 2 - $("#canv").height() / 2
            });
        }


        for (var i = 0; i < this.row; i++) {     //field filling function
            for (var j = 0; j < this.col; j++) {
                var temp = i * this.col + j + 1;

                var rand = Math.round(Math.random() * (Mas.length - 1));
                var qqq = Mas[rand];
                Mas.splice(rand, 1);

                $("<button/>", { class: "but" }).appendTo("#canv").css({
                    "width": this.w,
                    "height": this.h,
                    "top": 15 + i * (this.h + 1),
                    "left": 15 + j * (this.w + 1),
                }).attr("id", "el" + temp).text(qqq);

                $("#el" + temp).click(this.ifmoveButton.bind(this, $("#el" + temp)));

                if (i == this.row - 1 && j == this.col - 1)   //hide the empty button 
                    $("#el" + temp).hide();
            }
        }
    };   //end startGame
}

Game15.prototype.timer =
        function () {
            $("#time").text("Время: " + (++this.clock));
        }

Game15.prototype.ifmoveButton =
function () {
    if (this.firstStep) {
        this.firstStep = false;
        this.timerId = setInterval(this.timer.bind(this), 1000);
    }

    var idClick = parseInt(arguments[0].attr("id").substr(2), 10);  //получаем id щелчка

    if ($("#el" + (idClick + 1)).is(":hidden")) {
        this.moveBut(idClick, idClick + 1);
        return;
    }

    if ($("#el" + (idClick - 1)).is(":hidden")) {
        this.moveBut(idClick, idClick - 1);
        return;
    }

    if ($("#el" + (idClick + this.col)).is(":hidden")) {
        this.moveBut(idClick, idClick + this.col);
        return;
    }

    if ($("#el" + (idClick - this.col)).is(":hidden")) {
        this.moveBut(idClick, idClick - this.col);
        return;
    }
};

Game15.prototype.moveBut =
function (idClick, idNull) {
    $("#el" + idNull).text($("#el" + idClick).text());
    $("#el" + idNull).show("fast");
    $("#el" + idClick).text("");
    $("#el" + idClick).hide("fast", this.checkWin.bind(this));
    $("#move").text("Количество ходов: " + (++this.move));
};

Game15.prototype.checkWin =
function () {
    for (var i = 1; i < (this.sumCell) ; i++) {
        if (parseInt($("#el" + i).text(), 10) != i)
            return;
    }
    alert("Вы выиграли!!!");
    for (var i = 1; i < (this.sumCell) ; i++) {
        $("#el" + i).off("click");
    }
    clearInterval(this.timerId);
    $("#move").prop('disabled', true);
    $("#time").prop('disabled', true);
};