import {async, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdGridList, MdGridListModule} from './grid-list';
import {MdGridTile, MdGridTileText} from './grid-tile';


describe('MdGridList', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdGridListModule.forRoot()],
      declarations: [
        GridListWithoutCols,
        GridListWithInvalidRowHeightRatio,
        GridListWithTooWideColspan,
        GridListWithUnspecifiedRowHeight,
        GirdListWithRowHeightRatio,
        GridListWithFitRowHeightMode,
        GridListWithFixedRowHeightMode,
        GridListWithUnitlessFixedRowHeight,
        GridListWithUnspecifiedGutterSize,
        GridListWithGutterSize,
        GridListWithUnitlessGutterSize,
        GridListWithRatioHeightAndMulipleRows,
        GridListWithFixRowHeightAndMultipleRows,
        GridListWithColspanBinding,
        GridListWithRowspanBinding,
        GridListWithComplexLayout,
        GridListWithFootersWithoutLines,
        GridListWithFooterContainingTwoLines,
      ],
    });

    TestBed.compileComponents();
  }));

  it('should throw error if cols is not defined', () => {
    let fixture = TestBed.createComponent(GridListWithoutCols);

    expect(() => fixture.detectChanges()).toThrowError(/must pass in number of columns/);
  });

  it('should throw error if rowHeight ratio is invalid', () => {
    let fixture = TestBed.createComponent(GridListWithInvalidRowHeightRatio);

    expect(() => fixture.detectChanges()).toThrowError(/invalid ratio given for row-height/);
  });

  it('should throw error if tile colspan is wider than total cols', () => {
    let fixture = TestBed.createComponent(GridListWithTooWideColspan);

    expect(() => fixture.detectChanges()).toThrowError(/tile with colspan 5 is wider than grid/);
  });

  it('should default to 1:1 row height if undefined ', () => {
    let fixture = TestBed.createComponent(GridListWithUnspecifiedRowHeight);
    fixture.detectChanges();
    let tile = fixture.debugElement.query(By.directive(MdGridTile));

    // In ratio mode, heights are set using the padding-top property.
    expect(getStyle(tile, 'padding-top')).toBe('200px');
  });

  it('should use a ratio row height if passed in', () => {
    let fixture = TestBed.createComponent(GirdListWithRowHeightRatio);

    fixture.componentInstance.heightRatio = '4:1';
    fixture.detectChanges();

    let tile = fixture.debugElement.query(By.directive(MdGridTile));
    expect(getStyle(tile, 'padding-top')).toBe('100px');

    fixture.componentInstance.heightRatio = '2:1';
    fixture.detectChanges();

    expect(getStyle(tile, 'padding-top')).toBe('200px');
  });

  it('should divide row height evenly in "fit" mode', () => {
    let fixture = TestBed.createComponent(GridListWithFitRowHeightMode);

    fixture.componentInstance.totalHeight = '300px';
    fixture.detectChanges();
    let tile = fixture.debugElement.query(By.directive(MdGridTile));

    // 149.5 * 2 = 299px + 1px gutter = 300px
    expect(getStyle(tile, 'height')).toBe('149.5px');

    fixture.componentInstance.totalHeight = '200px';
    fixture.detectChanges();

    // 99.5 * 2 = 199px + 1px gutter = 200px
    expect(getStyle(tile, 'height')).toBe('99.5px');
  });

  it('should use the fixed row height if passed in', () => {
    let fixture = TestBed.createComponent(GridListWithFixedRowHeightMode);

    fixture.componentInstance.rowHeight = '100px';
    fixture.detectChanges();

    let tile = fixture.debugElement.query(By.directive(MdGridTile));
    expect(getStyle(tile, 'height')).toBe('100px');

    fixture.componentInstance.rowHeight = '200px';
    fixture.detectChanges();

    expect(getStyle(tile, 'height')).toBe('200px');
  });

  it('should default to pixels if row height units are missing', () => {
    let fixture = TestBed.createComponent(GridListWithUnitlessFixedRowHeight);
    fixture.detectChanges();

    let tile = fixture.debugElement.query(By.directive(MdGridTile));
    expect(getStyle(tile, 'height')).toBe('100px');
  });

  it('should default gutter size to 1px', () => {
    let fixture = TestBed.createComponent(GridListWithUnspecifiedGutterSize);
    fixture.detectChanges();

    let tiles = fixture.debugElement.queryAll(By.css('md-grid-tile'));

    // check horizontal gutter
    expect(getStyle(tiles[0], 'width')).toBe('99.5px');
    expect(getComputedLeft(tiles[1])).toBe(100.5);

    // check vertical gutter
    expect(getStyle(tiles[0], 'height')).toBe('100px');
    expect(getStyle(tiles[2], 'top')).toBe('101px');
  });

  it('should set the gutter size if passed', () => {
    let fixture = TestBed.createComponent(GridListWithGutterSize);
    fixture.detectChanges();

    let tiles = fixture.debugElement.queryAll(By.css('md-grid-tile'));

    // check horizontal gutter
    expect(getStyle(tiles[0], 'width')).toBe('99px');
    expect(getComputedLeft(tiles[1])).toBe(101);

    // check vertical gutter
    expect(getStyle(tiles[0], 'height')).toBe('100px');
    expect(getStyle(tiles[2], 'top')).toBe('102px');
  });

  it('should use pixels if gutter units are missing', () => {
    let fixture = TestBed.createComponent(GridListWithUnitlessGutterSize);
    fixture.detectChanges();

    let tiles = fixture.debugElement.queryAll(By.css('md-grid-tile'));

    // check horizontal gutter
    expect(getStyle(tiles[0], 'width')).toBe('99px');
    expect(getComputedLeft(tiles[1])).toBe(101);

    // check vertical gutter
    expect(getStyle(tiles[0], 'height')).toBe('100px');
    expect(getStyle(tiles[2], 'top')).toBe('102px');
  });

  it('should set the correct list height in ratio mode', () => {
    let fixture = TestBed.createComponent(GridListWithRatioHeightAndMulipleRows);
    fixture.detectChanges();

    let list = fixture.debugElement.query(By.directive(MdGridList));
    expect(getStyle(list, 'padding-bottom')).toBe('201px');
  });

  it('should set the correct list height in fixed mode', () => {
    let fixture = TestBed.createComponent(GridListWithFixRowHeightAndMultipleRows);
    fixture.detectChanges();

    let list = fixture.debugElement.query(By.directive(MdGridList));
    expect(getStyle(list, 'height')).toBe('201px');
  });

  it('should allow adjustment of tile colspan', () => {
    let fixture = TestBed.createComponent(GridListWithColspanBinding);
      fixture.componentInstance.colspan = 2;
      fixture.detectChanges();

      let tile = fixture.debugElement.query(By.directive(MdGridTile));
      expect(getStyle(tile, 'width')).toBe('199.5px');

      fixture.componentInstance.colspan = 3;
      fixture.detectChanges();
      expect(getStyle(tile, 'width')).toBe('299.75px');
  });

  it('should allow adjustment of tile rowspan', () => {
    let fixture = TestBed.createComponent(GridListWithRowspanBinding);

    fixture.componentInstance.rowspan = 2;
    fixture.detectChanges();

    let tile = fixture.debugElement.query(By.directive(MdGridTile));
    expect(getStyle(tile, 'height')).toBe('201px');

    fixture.componentInstance.rowspan = 3;
    fixture.detectChanges();
    expect(getStyle(tile, 'height')).toBe('302px');
  });

  it('should lay out tiles correctly for a complex layout', () => {
    let fixture = TestBed.createComponent(GridListWithComplexLayout);

      fixture.componentInstance.tiles = [
        {cols: 3, rows: 1},
        {cols: 1, rows: 2},
        {cols: 1, rows: 1},
        {cols: 2, rows: 1}
      ];

      fixture.detectChanges();
      let tiles = fixture.debugElement.queryAll(By.css('md-grid-tile'));

      expect(getStyle(tiles[0], 'width')).toBe('299.75px');
      expect(getStyle(tiles[0], 'height')).toBe('100px');
      expect(getComputedLeft(tiles[0])).toBe(0);
      expect(getStyle(tiles[0], 'top')).toBe('0px');

      expect(getStyle(tiles[1], 'width')).toBe('99.25px');
      expect(getStyle(tiles[1], 'height')).toBe('201px');
      expect(getComputedLeft(tiles[1])).toBe(300.75);
      expect(getStyle(tiles[1], 'top')).toBe('0px');

      expect(getStyle(tiles[2], 'width')).toBe('99.25px');
      expect(getStyle(tiles[2], 'height')).toBe('100px');
      expect(getComputedLeft(tiles[2])).toBe(0);
      expect(getStyle(tiles[2], 'top')).toBe('101px');

      expect(getStyle(tiles[3], 'width')).toBe('199.5px');
      expect(getStyle(tiles[3], 'height')).toBe('100px');
      expect(getComputedLeft(tiles[3])).toBe(100.25);
      expect(getStyle(tiles[3], 'top')).toBe('101px');
  });

  it('should add not add any classes to footers without lines', () => {
    let fixture = TestBed.createComponent(GridListWithFootersWithoutLines);
    fixture.detectChanges();

    let footer = fixture.debugElement.query(By.directive(MdGridTileText));
    expect(footer.nativeElement.classList.contains('md-2-line')).toBe(false);
  });

  it('should add class to footers with two lines', () => {
    let fixture = TestBed.createComponent(GridListWithFooterContainingTwoLines);
    fixture.detectChanges();

    let footer = fixture.debugElement.query(By.directive(MdGridTileText));
    expect(footer.nativeElement.classList.contains('md-2-line')).toBe(true);
  });
});


function getStyle(el: DebugElement, prop: string): string {
  return getComputedStyle(el.nativeElement).getPropertyValue(prop);
}

/** Gets the `left` position of an element. */
function getComputedLeft(element: DebugElement): number {
  // While the other properties in this test use `getComputedStyle`, we use `getBoundingClientRect`
  // for left because iOS Safari doesn't support using `getComputedStyle` to get the calculated
  // `left` balue when using CSS `calc`. We subtract the `left` of the document body because
  // browsers, by default, add a margin to the body (typically 8px).
  let elementRect = element.nativeElement.getBoundingClientRect();
  let bodyRect = document.body.getBoundingClientRect();

  return elementRect.left - bodyRect.left;
}



@Component({template: '<md-grid-list></md-grid-list>'})
class GridListWithoutCols { }

@Component({template: '<md-grid-list cols="4" rowHeight="4:3:2"></md-grid-list>'})
class GridListWithInvalidRowHeightRatio { }

@Component({template:
    '<md-grid-list cols="4"><md-grid-tile colspan="5"></md-grid-tile></md-grid-list>'})
class GridListWithTooWideColspan { }

@Component({template: `
    <div style="width:200px">
      <md-grid-list cols="1">
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithUnspecifiedRowHeight { }

@Component({template: `
    <div style="width:400px">
      <md-grid-list cols="1" [rowHeight]="heightRatio">
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GirdListWithRowHeightRatio {
  heightRatio: string;
}

@Component({template: `
    <md-grid-list cols="1" rowHeight="fit" [style.height]="totalHeight">
      <md-grid-tile></md-grid-tile>
      <md-grid-tile></md-grid-tile>
    </md-grid-list>`})
class GridListWithFitRowHeightMode {
  totalHeight: string;
}

@Component({template: `
    <md-grid-list cols="4" [rowHeight]="rowHeight">
      <md-grid-tile></md-grid-tile>
    </md-grid-list>`})
class GridListWithFixedRowHeightMode {
  rowHeight: string;
}

@Component({template: `
    <md-grid-list cols="4" rowHeight="100">
      <md-grid-tile></md-grid-tile>
    </md-grid-list>`})
class GridListWithUnitlessFixedRowHeight {
  rowHeight: string;
}

@Component({template: `
    <div style="width:200px">
      <md-grid-list cols="2" rowHeight="100px">
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithUnspecifiedGutterSize { }

@Component({template: `
    <div style="width:200px">
      <md-grid-list cols="2" gutterSize="2px" rowHeight="100px">
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithGutterSize { }

@Component({template: `
    <div style="width:200px">
      <md-grid-list cols="2" gutterSize="2" rowHeight="100px">
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithUnitlessGutterSize { }

@Component({template: `
    <div style="width:400px">
      <md-grid-list cols="1" rowHeight="4:1">
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithRatioHeightAndMulipleRows { }

@Component({template: `
    <md-grid-list cols="1" rowHeight="100px">
      <md-grid-tile></md-grid-tile>
      <md-grid-tile></md-grid-tile>
    </md-grid-list>`})
class GridListWithFixRowHeightAndMultipleRows { }

@Component({template: `
    <div style="width:400px">
      <md-grid-list cols="4">
        <md-grid-tile [colspan]="colspan"></md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithColspanBinding {
  colspan: number;
}

@Component({template: `
    <md-grid-list cols="1" rowHeight="100px">
      <md-grid-tile [rowspan]="rowspan"></md-grid-tile>
    </md-grid-list>`})
class GridListWithRowspanBinding {
  rowspan: number;
}

@Component({template: `
    <div style="width:400px">
      <md-grid-list cols="4" rowHeight="100px">
        <md-grid-tile *ngFor="let tile of tiles" [colspan]="tile.cols" [rowspan]="tile.rows"
                      [style.background]="tile.color">
          {{tile.text}}
        </md-grid-tile>
      </md-grid-list>
    </div>`})
class GridListWithComplexLayout {
  tiles: any[];
}

@Component({template: `
    <md-grid-list cols="1">
      <md-grid-tile>
        <md-grid-tile-footer>
          I'm a footer!
        </md-grid-tile-footer>
      </md-grid-tile>
    </md-grid-list>`})
class GridListWithFootersWithoutLines { }

@Component({template: `
    <md-grid-list cols="1">
      <md-grid-tile>
        <md-grid-tile-footer>
          <h3 md-line>First line</h3>
          <span md-line>Second line</span>
        </md-grid-tile-footer>
      </md-grid-tile>
    </md-grid-list>`})
class GridListWithFooterContainingTwoLines { }
