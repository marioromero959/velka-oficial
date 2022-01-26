import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards = [
    {img:"../../../assets/img-velka/frase1.jpg"},
    {img:"../../../assets/img-velka/post40.jpg"},
    {img:"../../../assets/img-velka/frase2.jpg"}
  ]
  constructor() { }

  ngOnInit(): void {}
  
}
