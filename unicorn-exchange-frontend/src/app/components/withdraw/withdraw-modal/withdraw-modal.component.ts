import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {genCtrl} from "../../../../services/utils";
import * as yup from "yup";
import {BaseComponent} from "../../base-component/base.component";
import {AlertType} from "../../alerts/alerts.enum";
import {CommonStore} from "../../../stores/common-store.service";

enum withDrawFields {
  address = "address",
  amount = "amount",
  password = "password",
}

const withDrawValidationScheme = {
  [withDrawFields.address]: yup
    .string()
    .nullable()
    .required(),
  [withDrawFields.password]: yup
    .string()
    .nullable()
    .required(),
  [withDrawFields.amount]: yup
    .number()
    .nullable()
    .required(),
};

@Component({
  selector: "app-withdraw-modal-content",
  templateUrl: "./withdraw-modal.component.html",
  styleUrls: ["./withdraw-modal.component.scss"]
})
export class WithdrawModalComponent extends BaseComponent implements OnInit {
  submitted = false;
  formFields = withDrawFields;
  scheme = withDrawValidationScheme;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: this.formFields.address, scheme: this.scheme}),
    genCtrl({key: this.formFields.amount, scheme: this.scheme}),
    genCtrl({key: this.formFields.password, scheme: this.scheme})
  ));


  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private commonStore: CommonStore,
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

  onSubmit(event, formData) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }
    this.commonStore.showAlert({
      text: "Successful",
      type: AlertType.success,
    });
    this.activeModal.dismiss("Cross click");
  }
}
