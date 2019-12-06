import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ROUTES} from "src/config";
import {genCtrl} from "../../../services/utils";
import {signInValidationScheme} from "../../../../../unicorn-exchange-types/types/validators/sign-in-validator";
import {signInFields} from "../../../../../unicorn-exchange-types/types/enums/forms/sign-in";
import {AuthStore} from "../../stores/auth-store.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngstack/translate";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";
import {CommonStore} from "../../stores/common-store.service";
import {AlertType} from "../alerts/alerts.enum";

@Component({
  selector: "app-sign-in-component",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent extends BaseComponent implements OnInit {
  ROUTES = ROUTES;
  submitted = false;
  formFields = signInFields;
  scheme = signInValidationScheme;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: this.formFields.email, scheme: this.scheme}),
    genCtrl({key: this.formFields.password, scheme: this.scheme})
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
      .signIn(formData)
      .then(() => this.router.navigate([ROUTES.ORDERS]))
      .catch(err => {
        console.error(err);
        this.commonStore.showAlert({
          text: "Invalid credentials",
          type: AlertType.error
        });
      });
  }
}

