import { Component, OnInit } from '@angular/core';

// Llamando init_plugins de custom.js, o se queda cargando para toda la vida.
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
