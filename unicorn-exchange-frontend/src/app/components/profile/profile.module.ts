// import {APP_INITIALIZER, NgModule} from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { RouterModule } from "@angular/router";
// import { ProfileComponent } from "./profile.component";
// import { ProfileInformationComponent } from "./profile-information/profile-information.component";
// import {TranslateModule, TranslateService} from "@ngstack/translate";
// import {setupTranslateFactory} from "../app.module";
// import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
//
// @NgModule({
//   imports: [
//     CommonModule,
//     TranslateModule.forRoot(),
//     NgbRatingModule,
//     RouterModule.forChild([
//       {
//         path: "",
//         component: ProfileComponent
//       }
//     ])
//   ],
//   declarations: [
//     ProfileComponent,
//     ProfileInformationComponent,
//   ],
//   providers: [
//     TranslateService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: setupTranslateFactory,
//       deps: [TranslateService],
//       multi: true
//     }
//   ],
//
//
// })
// export class ProfileModule { }
