import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Tile } from "app/models/tile";
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'preview-outlet',
  templateUrl: './preview-tile.component.html',
  styleUrls: ['./preview-tile.component.scss']
})
export class PreviewTileComponent implements OnInit {

 
  @Input() tile: any;

  constructor(private toastService: ToastService) { 
    
  }

  ngOnInit() {
  }
}
