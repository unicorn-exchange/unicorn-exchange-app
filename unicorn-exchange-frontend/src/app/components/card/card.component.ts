import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-card-component",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() userName: string;
  @Input() sellPrice: number;
  @Input() buyPrice: number;
  @Input() sellCurrency: string;
  @Input() buyCurrency: string;
  @Input() country: string;
  @Input() paymentMethod: string;
  @Input() userRate: number;
  @Input() isDarkCard: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
