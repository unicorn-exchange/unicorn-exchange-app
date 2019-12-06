import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-profile-form-component",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"]
})
export class ProfileFormComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;

  constructor() {
  }

  ngOnInit() {
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      console.log(event);
    };
  }
}
