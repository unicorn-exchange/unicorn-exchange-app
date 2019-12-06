import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-rating-component",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"]
})
export class RatingComponent implements OnInit {
  @Input() rate: number; // TODO: Think about floating rating support (eg. 3.4)
  @Input() maxRate: number;
  @Input() isReadOnly: boolean;
  @Input() color = "#e9e9f0";

  constructor() {
  }

  ngOnInit() {
  }
}
