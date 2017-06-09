import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Tile } from "app/models/tile";
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'tile-outlet',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  @Output() tileClicked = new EventEmitter();


  constructor(private toastService: ToastService) { 
  }

  ngOnInit() {
  
  }
 
  clickTile(): void{
    this.tileClicked.emit(this.tile);
  }
}
