
// oDomBoard
const gameBoardId = "gameBoard";
const scoreDomId = "score";

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'russian',
    templateUrl: './russian.html',
    styleUrls: ['russian.scss']
})
export class Russian implements OnInit {
    teris: TERIS;
    constructor() {


    }
    ngOnInit() {
        this.teris = new TERIS();
    }

}

class DomBoard {
    private element: HTMLElement
    constructor(element: HTMLElement) {
        this.element = element;
    }
    insertRow(position: number): DomTableRow {
        return new DomTableRow();
    }
}

class DomGrid {
    private cells: any[][];
    public get row() {
        return this.cells.length;
    }
    /**
     * 创建一个网格
     * @param {number} x 行
     * @param {number} y 列
     * 
     * @memberOf DomGrid
     */
    constructor(x: number, y: number) {
        this.cells = new Array();
        for (var row = 0; row < x; row++) {
            var oneRow = new Array()
            for (var col = 0; col < y; col++) {
                oneRow.push(0);
            }
            this.cells.push(oneRow);
        }
        this.render();
    }
    render() {
        var gameBoardDom: HTMLTableElement = <HTMLTableElement>document.getElementById(gameBoardId);
        for (let row = 0; row < this.cells.length; row++) {
            debugger;
            let rowDom: HTMLTableRowElement = gameBoardDom.insertRow(-1);

            for (let col = 0; col < this.cells[row].length; col++) {
                rowDom.insertCell(col);
            }

        }
    }
}

class DomTableRow {
    insertCell(cols: number) {

    }
}

class DomScore {
    private element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    }
}

class Block {
    moveLeft() {
        console.log('block move left');
    }

    rotate() {
        console.log('block rotate');
    }
    moveRight() {
        console.log('block move right');
    }
    moveDown() {
        console.log('block move down');
    }
}

class TERIS {
    board: DomBoard;
    score: DomScore;
    block: Block;
    grid: DomGrid;
    aShape = [
        [0xCC00],
        [0x8888, 0xF00],
        [0x8C40, 0x6C00],
        [0x4C80, 0xC600],
        [0x44C0, 0x8E00, 0xC880, 0xE200],
        [0x88C0, 0xE800, 0xC440, 0x2E00],
        [0x4E00, 0x8C80, 0xE400, 0x4C40]
    ];
    constructor() {
        this.board = new DomBoard(document.getElementById(gameBoardId));
        this.score = new DomScore(document.getElementById(scoreDomId));

        this.grid = new DomGrid(18, 10);
        for (var rows = 0; rows < 18; rows++) {
            this.grid[rows] = new Array(10);
            var tr = this.board.insertRow(-1);
            for (var cols = 0; cols < 10; cols++) {
                this.grid[rows][cols] = 0;
                tr.insertCell(cols);
            }
        }
        document.onkeydown = (keyEvent: KeyboardEvent) => {
            keyEvent = <KeyboardEvent>(keyEvent || window.event);
            var ikeyNum = keyEvent.which || keyEvent.keyCode;
            switch (ikeyNum) {
                case 37://←    
                    this.block.moveLeft();
                    break;
                case 38://↑     
                    this.block.rotate();
                    break;
                case 39://→    
                    this.block.moveRight();
                    break;
                case 40://↓    
                    this.block.moveDown();
                    break;
            }
        };

    }
}


