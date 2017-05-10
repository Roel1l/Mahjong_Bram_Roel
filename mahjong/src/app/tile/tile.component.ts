import { Component, OnInit, Input } from '@angular/core';
import { Tile } from "app/models/tile";

@Component({
  selector: 'tile-outlet',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  
  constructor() { }

  ngOnInit() {
  
  }

}
