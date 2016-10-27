import { Theme1Service } from '../';

// oDomBoard
const gameBoardId = "gameBoard";
const scoreDomId = "score";

import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'russian',
    templateUrl: './russian.html',
    styleUrls: ['./russian.scss']

})
export class Russian {
    static ROWS = 18;
    static COLS = 10;
    currentBlock: Block;
    timmer;
    static ShapesOption: [[Cell]] = [
        // 方块田
        [{ x: 4, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 0 }, { x: 5, y: 1 }]
        // new Block({x:})
    ];

    grid: any[][];
    constructor(private el: ElementRef) {
        this.initGrid(Russian.ROWS, Russian.COLS);
    }

    /**
     * 初始化俄罗斯方块,ROWS行数,COLS是列数
     * 
     * @param {number} ROWS
     * @param {number} COLS
     * 
     * @memberOf Russian
     */
    initGrid(ROWS: number, COLS: number) {
        this.grid = [];
        for (let row = 0; row < ROWS; row++) {
            var tempCol = [];
            for (let col = 0; col < COLS; col++) {
                tempCol.push(false);
            }
            this.grid.push(tempCol);
        }
    }

    start() {
        if (this.timmer) return;
        this.timmer = setInterval(() => {
            this.next()
        }, 1000);
    }
    stop() {
        clearInterval(this.timmer);
        this.timmer = null;
    }

    next() {
        this.currentBlock = new Block(Russian.ShapesOption[0]);
        // 消除原有的cell true;

        this.currentBlock.moveDown();
        this.currentBlock.cells.forEach(cell => {
            this.grid[cell.y - 2][cell.x] = false;
        });

        this.draw();
    }

    draw() {
        // 绘画当前的俄罗斯方块

        this.currentBlock.cells.forEach((value: { x: number, y: number }) => {
            console.log(`俄罗斯方块的水平位置${value.x}竖直位置是: ${value.y}`);
            this.grid[value.y][value.x] = true;
        })
    }

}


class Block {
    cells: Cell[];
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
        this.cells.forEach(cell => {

            cell.y++;
        });
    }
    constructor(cells: { x: number, y: number }[]) {
        this.cells = cells;
    }
}

interface Cell {
    x: number;
    y: number;


}



