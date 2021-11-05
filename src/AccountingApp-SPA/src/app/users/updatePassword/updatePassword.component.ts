import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../_services/auth.service";
import { AlertifyService } from "../../_services/alertify.service";

@Component({
  selector: "app-updatePassword",
  templateUrl: "./updatePassword.component.html",
  styleUrls: ["./updatePassword.component.css"]
})
export class UpdatePasswordComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  updatePassword() {
    this.authService.updatePassword(this.model).subscribe(
      () => {
        this.alertify.success("update successful");
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
