import { Component, Input, OnInit } from '@angular/core';
import { PageFolder } from 'src/app/models/page-folder.interface';

@Component({
  selector: 'app-page-folder-button',
  templateUrl: './page-folder-button.component.html',
  styleUrls: ['./page-folder-button.component.css']
})
export class PageFolderButtonComponent implements OnInit {
  @Input() folder: PageFolder;

  constructor() {}

  ngOnInit(): void {}
}
