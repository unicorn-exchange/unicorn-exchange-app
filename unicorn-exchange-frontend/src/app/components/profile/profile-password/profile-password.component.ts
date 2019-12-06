import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {genCtrl} from "../../../../services/utils";
import {ProfileStore} from "../../../stores/profile-store.service";
import * as yup from "yup";
import {BaseComponent} from "../../base-component/base.component";
import {AlertType} from "../../alerts/alerts.enum";
import {CommonStore} from "../../../stores/common-store.service";

export enum changePasswordFields {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  confirmPassword = "confirmPassword",
}

export const changePasswordValidationScheme = {
  [changePasswordFields.oldPassword]: yup
    .string()
    .nullable()
    .required(),
  [changePasswordFields.newPassword]: yup
    .string()
    .nullable()
    .required(),
};

@Component({
  selector: "app-profile-password-component",
  templateUrl: "./profile-password.component.html",
  styleUrls: ["./profile-password.component.scss"]
})
export class ProfilePasswordComponent extends BaseComponent implements OnInit {
  submitted = false;
  formFields = changePasswordFields;
  scheme = changePasswordValidationScheme;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: this.formFields.oldPassword, scheme: this.scheme}),
    genCtrl({key: this.formFields.newPassword, scheme: this.scheme}),
    genCtrl({
      key: this.formFields.confirmPassword, scheme: {
        [changePasswordFields.confirmPassword]: yup
          .string()
          .nullable()
          .matches(/"newPassword"/)
          .required(),
      }
    }),
  ));

  constructor(
    private fb: FormBuilder,
    private profileStore: ProfileStore,
    private commonStore: CommonStore,
  ) {
    super();
  }

  ngOnInit() {
  }

  onSubmit(event, formData) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }

    this.profileStore
      .profileChangePassword(formData)
      .then(() => {
        this.commonStore.showAlert({
          type: AlertType.success,
          text: "Password changed ",
        });
      })
      .catch(() => {
        this.commonStore.showAlert({
          type: AlertType.error,
          text: "Error while changing password. Try again later",
        });
      });
  }
}
