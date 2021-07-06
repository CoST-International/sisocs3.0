import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-loader',
  templateUrl: './list-loader.component.html',
  styleUrls: ['./list-loader.component.scss']
})
export class ListLoaderComponent implements OnInit {

  width!: number;
  height!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
