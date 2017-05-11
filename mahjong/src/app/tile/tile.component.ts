import { Component, OnInit, Input } from '@angular/core';
import { Tile } from "app/models/tile";
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'tile-outlet',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  
  constructor(private toastService: ToastService) { }

  ngOnInit() {
  
  }
 
  logTile(): void{
    this.toastService.showInfo(this.tile.tile.name,this.tile.xPos + " - " + this.tile.yPos + " - " + this.tile.zPos + " -  " + this.tile.tile.suit);
    console.log(this.tile);
  }
}
