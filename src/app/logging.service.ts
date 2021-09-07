import { Injectable } from "@angular/core";

//@Injectable({ providedIn: "root" })
export class LoggingService {
  logmesg: string;
  printlog(message: string) {
    console.log(message);
    console.log(this.logmesg);
    this.logmesg = message;
  }
}
