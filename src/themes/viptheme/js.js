var TETRIS = {
    aBoardGrids: [],
    aShapes: [
        [0xCC00],
        [0x8888, 0xF00],
        [0x8C40, 0x6C00],
        [0x4C80, 0xC600],
        [0x44C0, 0x8E00, 0xC880, 0xE200],
        [0x88C0, 0xE800, 0xC440, 0x2E00],
        [0x4E00, 0x8C80, 0xE400, 0x4C40]
    ],
    //代表所有方块的形状数    
    init: function () {
        this.oDomBoard = document.getElementById("gameBoard");
        this.oDomScore = document.getElementById("score");
        this.aBoardGrids = new Array(18);
        for (var rows = 0; rows < 18; rows++) {
            this.aBoardGrids[rows] = new Array(10);
            var oDomTr = this.oDomBoard.insertRow(-1);
            for (var cols = 0; cols < 10; cols++) {
                this.aBoardGrids[rows][cols] = 0;
                oDomTr.insertCell(cols);
            }
        }
        document.onkeydown = function (keyEvent) {
            keyEvent = keyEvent || window.event;
            var ikeyNum = keyEvent.which || keyEvent.keyCode;
            switch (ikeyNum) {
                case 37://←    
                    T.oBlock.move("left");
                    break;
                case 38://↑     
                    T.oBlock.rotate((function () {
                        var vShape = T.aShapes[T.iShapeIdx][(++T.index) % T.aShapes[T.iShapeIdx].length];
                        var sShape = vShape.toString(2);
                        sShape = new Array(17 - sShape.length).join(0) + sShape;
                        T.matrix = sShape.match(/\d{4}/g);
                        return T.matrix;
                    })());  //变形    
                    break;
                case 39://→    
                    T.oBlock.move("right");
                    break;
                case 40://↓    
                    T.oBlock.move("down");
                    break;
            }
        };
    },
    next: function () {

        this.iShapeIdx = parseInt(Math.random() * this.aShapes.length);
        this.index = 0;
        var vShape = this.aShapes[this.iShapeIdx][this.index];
        var sShape = vShape.toString(2);                               //将16进制转换为二进制    
        sShape = new Array(17 - sShape.length).join(0) + sShape;   //不够16位，在前面用0补全     
        this.matrix = sShape.match(/\d{4}/g);                           //利用正则表达式匹配    

        this.oBlock = new TETRIS.Block(this.matrix);

        clearInterval(T.timer);
        //注册定时器    
        T.timer = setInterval(function () {
            T.oBlock.move("down");
        }, 1000);

        if (!T.oBlock.checkBlock()) {
            alert("Game Over~");
            clearInterval(T.timer);

        }
    },
    updateBoard: function () {      //更新面板    
        for (var i = 0; i < 4; i++) {
            this.aBoardGrids[T.oBlock.shape[i].y][T.oBlock.shape[i].x] = 1;
        }
    },
    eraseLines: function () {
        var iLines = 0;
        for (var j = 17; j >= 0; j--) {
            var num = 0;
            for (var i = 0; i < 10; i++) {
                if (this.aBoardGrids[j][i] == 1)
                    num++;
            }
            if (num == 10) {
                iLines++;
                for (var m = 0; m < i; m++) {
                    for (var n = j; n > 0; n--) {
                        this.aBoardGrids[n][m] = this.aBoardGrids[n - 1][m];
                        T.oDomBoard.rows[n].cells[m].style.background = T.oDomBoard.rows[n - 1].cells[m].style.background;
                    }
                    this.aBoardGrids[0][m] = 0;
                }
                j++;
            }
        }
        return iLines;
    },
    setScore: function (iLines) {
        var iScore = parseInt(this.oDomScore.innerHTML);
        if (iLines == 1) {
            iScore += 100;
        } else if (iLines == 2) {
            iScore += 300;
        } else if (iLines == 3) {
            iScore += 500;
        } else if (iLines == 4) {
            iScore += 1000;
        }
        this.oDomScore.innerHTML = iScore;
    }
};

TETRIS.Block = function (matrix) {

    this.shape = (function () {

        var aShape = [];
        for (var i = 0; i < matrix.length; i++) {
            var sValue = matrix[i];
            for (var j = 0; j < sValue.length; j++) {
                if (sValue.charAt(j) == "1") {
                    aShape.push({ x: j + 3, y: i });
                }
            }
        }
        return aShape;

    })();
    this.draw();
};

TETRIS.Block.prototype.move = function (direction) {//移动    
    if (this.checkBlock(this.shape, direction)) {
        this.draw("clear");
        for (var i = 0; i < 4; i++) {
            switch (direction) {
                case "left"://←     
                    this.shape[i].x--;
                    break;
                case "right":
                    this.shape[i].x++;
                    break;
                case "down":
                    this.shape[i].y++;
                    break;
            }
        }
        this.draw();
    } else {
        if (direction == "down") {
            this.draw();
            T.updateBoard();    //更新面板    
            var iLines = T.eraseLines();

            if (iLines > 0) {
                T.setScore(iLines);
            }
            T.next();           //再生成一个新的方块    
        }
    }
};
TETRIS.Block.prototype.rotate = function (matrix) {//变形    
    this.shape = (function (oBlock) {
        var aX = [];
        var aY = [];
        for (var i = 0; i < 4; i++) {
            aX.push(oBlock.shape[i].x);
            aY.push(oBlock.shape[i].y);
        }
        var iMinX = aX.getMin();
        var iMinY = aY.getMin();
        var aShape = [];
        for (var i = 0; i < matrix.length; i++) {
            var sValue = matrix[i];
            for (var j = 0; j < sValue.length; j++) {
                if (sValue.charAt(j) == "1") {
                    aShape.push({ x: j + iMinX, y: i + iMinY });
                }
            }
        }
        if (!(oBlock.checkBlock(aShape)))
            return oBlock.shape;
        oBlock.draw("clear");
        return aShape;
    })(this);
    this.draw();
};

TETRIS.Block.prototype.draw = function (opt) {//绘图    
    for (var i = 0; i < this.shape.length; i++) {
        var oShape = this.shape[i];
        T.oDomBoard.rows[oShape.y].cells[oShape.x].style.background = (opt == undefined ? "#09F" : "");
    }
};
TETRIS.Block.prototype.checkBlock = function (shape, direction) {
    shape = shape || this.shape;
    for (var i = 0; i < 4; i++) {
        if (direction == "left") {
            if (shape[i].x == 0 || T.aBoardGrids[shape[i].y][shape[i].x - 1] == 1) {
                return false;
            }
        } else if (direction == "right") {
            if (shape[i].x == 9 || T.aBoardGrids[shape[i].y][shape[i].x + 1] == 1) {
                return false;
            }
        } else if (direction == "down") {
            if (shape[i].y == 17 || T.aBoardGrids[shape[i].y + 1][shape[i].x] == 1) {
                return false;
            }
        }
        if (shape[i].x < 0 || shape[i].x > 9 || shape[i].y < 0 || shape[i].y > 17)
            return false;
        if (T.aBoardGrids[shape[i].y][shape[i].x] == 1) {
            return false;
        };
    }
    return true;
}
Array.prototype.getMin = function () {
    var iMin = this[0];
    for (var i = 0; i < this.length; i++) {
        if (this[i] < iMin)
            iMin = this[i];
    }
    return iMin;
}
window.onload = function () {
    T.init();
    var oBtnPlay = document.getElementById("btnPlay");
    oBtnPlay.onclick = function () {
        if (this.value == "begin") {
            T.next();
            this.value = "over";
        } else {
            this.value = "begin";
            alert("Game Over~");
            clearInterval(T.timer);
        }
    }
    var oBtnPause = document.getElementById("btnPause");
    oBtnPause.onclick = function () {
        if (this.value == "pause") {
            clearInterval(T.timer);
            this.value = "resume";
        } else {
            T.timer = setInterval(function () {
                T.oBlock.move("down");
            }, 1000);
            this.value = "pause";
        };
    };

};    
