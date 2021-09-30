var game = /** @class */ (function () {
    function game(t_id, team_num, h_btn) {
        this.row = 2;
        this.col = 2;
        this.t_id = t_id;
        this.team_num = team_num;
        this.player_runs = [];
        this.Table();
        this.sum = 0;
        this.h_btn = h_btn;
        //document.getElementById(this.h_btn).setAttribute("disabled","disabled");
        document.getElementById(this.h_btn).addEventListener("click", this.Hit());
    }
    game.prototype.Table = function () {
        var t = document.getElementById(this.t_id);
        for (var row = 1; row <= 11; row++) {
            this.tr = document.createElement("tr");
            for (var i = 1; i <= 8; i++) {
                if (row == 1) {
                    this.th = document.createElement("th");
                    if (i == 1) {
                        this.th.innerHTML = "TEAM" + this.team_num;
                    }
                    else if (i != 8) {
                        this.th.innerHTML = "B" + (i - 1);
                    }
                    else {
                        this.th.innerHTML = "TOTAL";
                    }
                    this.tr.appendChild(this.th);
                }
                else {
                    this.td = document.createElement("td");
                    if (i == 1) {
                        this.td.innerHTML = "PLAYER" + (row - 1);
                    }
                    else {
                        this.td.innerHTML = " ";
                        this.td.setAttribute("id", this.team_num.toString() + row.toString() + i.toString());
                    }
                    this.tr.appendChild(this.td);
                }
                t.appendChild(this.tr);
            }
        }
    };
    game.prototype.Hit = function () {
        var _this = this;
        return function () {
            _this.td = document.getElementById(_this.team_num.toString() + _this.row.toString() + _this.col.toString());
            var runs = Math.floor(Math.random() * 6);
            _this.td.innerHTML = runs.toString();
            console.log(_this.row, _this.col);
            if (_this.col <= 7 && runs != 0) {
                _this.col = _this.col + 1;
                _this.player_runs.push(runs);
                var s = _this.Sum(_this.row);
                _this.sum = _this.sum + runs;
                document.getElementById("total" + _this.team_num.toString()).innerText = "" + _this.sum;
            }
            else {
                var s = _this.Sum(_this.row);
                _this.row = _this.row + 1;
                _this.col = 2;
                _this.player_runs = [];
                document.getElementById("total" + _this.team_num.toString()).innerText = "" + _this.sum;
            }
            if (_this.row == 12) {
                document.getElementById(_this.h_btn).setAttribute("disabled", "disabled");
            }
        };
    };
    game.prototype.Sum = function (row) {
        var c = 8;
        var s = this.player_runs.reduce(function (a, b) { return a + b; }, 0);
        document.getElementById(this.team_num.toString() + row.toString() + "" + 8).innerHTML = "" + s;
        return s;
    };
    return game;
}());
var Timer = /** @class */ (function () {
    function Timer() {
        this.countdown();
        this.start = 60;
        this.generate = document.getElementById("result");
        this.generate.addEventListener("click", this.generate_results());
    }
    Timer.prototype.countdown = function () {
        var temp = 0;
        var _loop_1 = function (i) {
            setTimeout(function () {
                var timer = document.getElementById("timer");
                timer.innerHTML = "" + i;
                this.start = this.start - 1;
            }, 1000 * temp);
            temp = temp + 1;
        };
        for (var i = 60; i >= 0; i--) {
            _loop_1(i);
        }
    };
    Timer.prototype.generate_results = function () {
        var _this = this;
        return function () {
            var s1 = parseInt(document.getElementById("total1").innerHTML);
            var s2 = parseInt(document.getElementById("total2").innerHTML);
            var winner_team = 0;
            if (s1 == s2) {
                document.getElementById("win").innerHTML = " Match Draw";
                document.getElementById("man").innerHTML = "None";
            }
            else {
                if (s1 > s2) {
                    document.getElementById("win").innerHTML = "Team 1 won the match";
                    winner_team = 1;
                }
                else {
                    document.getElementById("win").innerHTML = "Team 2 won the match";
                    winner_team = 2;
                }
                _this.manofthematch(winner_team);
            }
        };
    };
    Timer.prototype.manofthematch = function (team) {
        var sum1 = [];
        for (var i = 2; i <= 11; i++) {
            var c = 8;
            sum1.push(document.getElementById(team + "" + i + c.toString()).innerText);
        }
        //console.log(sum1)
        var m = Math.max.apply(Math, sum1);
        console.log(m + "Highest");
        document.getElementById("man").innerHTML = "Team" + team + "<br>player" + (sum1.indexOf("" + m) + 1) + "</i>";
    };
    return Timer;
}());
new game("t1", 1, "hit1");
setTimeout(function () {
    new Timer();
}, 2 * 1000);
setTimeout(function () {
    document.getElementById("team").innerHTML = "Team 2 Start the game";
    document.getElementById("timer").innerHTML = " ";
    new Timer();
}, 65 * 1000);
setTimeout(function () {
    document.getElementById("team").innerHTML = "Team 2 Stop the game<br> <b>To view the results click Generate results<b>";
    document.getElementById("timer").innerHTML = " ";
}, 125 * 1000);
new game("t2", 2, "hit2");
