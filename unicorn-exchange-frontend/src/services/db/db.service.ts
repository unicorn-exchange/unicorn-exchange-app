import {Inject, Injectable} from "@angular/core";
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";

@Injectable({
  providedIn: "root"
})
export class DBService {
  constructor(
    @Inject(LOCAL_STORAGE) public storage: StorageService,
  ) {
  }
}
