import {Component, Input, OnInit} from '@angular/core';

export enum MenuItemType {
  Link = 'link',
  Router = 'router',
  Callback = 'callback'
}

export interface MenuItem {
  label: string;
  type: MenuItemType;
  url?: string;
  cb?: () => void;
}

@Component({
  selector: 'app-kkb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  data: MenuItem[];

  constructor() {
  }

  ngOnInit() {
  }
}
