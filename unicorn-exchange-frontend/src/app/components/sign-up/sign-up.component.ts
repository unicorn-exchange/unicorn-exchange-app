import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "../../../config";
import {genCtrl} from "../../../services/utils";
import {signUpValidationScheme} from "../../../../../unicorn-exchange-types/types/validators/sign-up-validator";
import {signUpFields} from "../../../../../unicorn-exchange-types/types/enums/forms/sign-up";
import {Router} from "@angular/router";
import {TranslateService} from "@ngstack/translate";
import {AuthStore} from "../../stores/auth-store.service";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";
import {AlertType} from "../alerts/alerts.enum";
import {CommonStore} from "../../stores/common-store.service";

@Component({
  selector: "app-sign-up-component",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent extends BaseComponent implements OnInit {
  ROUTES = ROUTES;
  submitted = false;
  formFields = signUpFields;
  scheme = signUpValidationScheme;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: this.formFields.username, scheme: this.scheme}),
    genCtrl({key: this.formFields.email, scheme: this.scheme}),
    genCtrl({key: this.formFields.password, scheme: this.scheme}),
  ));

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private commonStore: CommonStore,
    private translate: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(v => {
        console.log(v);
      });
  }

  loginWithGoogle() {
    this.authStore.googleLogin();
  }

  onSubmit(event, formData) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.invalid) {
      return this.commonStore.showAlert({
        text: "Please check the form",
        type: AlertType.warning
      });
    }

    this.authStore
      .signUp(formData)
      .then(() => this.router.navigate([ROUTES.OPEN_MARKET]))
      .catch(err => {
        this.commonStore.showAlert({
          text: "Invalid credentials",
          type: AlertType.error
        });
      });
  }
}

