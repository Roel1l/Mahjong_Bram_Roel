import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Tile } from "app/models/tile";
import { ToastService } from "app/services/toast.service";
import { ThemeService } from "app/services/theme-service";

@Component({
  selector: 'tile-outlet',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  @Output() tileClicked = new EventEmitter();
  currentTheme : number = 1;

  constructor(private toastService: ToastService, private themeService: ThemeService) { 
  }

  ngOnInit() {
    this.themeService.subject.subscribe(value => {
      this.currentTheme = value;
    })
  }
 
  clickTile(): void{
    this.tile.tileIsClicked = true;
    this.tileClicked.emit(this.tile);
  }


}
