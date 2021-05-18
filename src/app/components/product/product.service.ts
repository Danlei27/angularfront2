import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import {  ResponseUser, ResponseCreate, ResponseUsers, User } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  
  baseUrl = "http://localhost:3003";

  constructor(private snackBar: MatSnackBar, public http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl+'/users', user).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<ResponseUsers[]> {
    return this.http.get<User[]>(this.baseUrl+'/users').pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.get<User>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(user: User, id: number): Observable<ResponseUser> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.put<ResponseUser>(url, user).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<ResponseCreate> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.delete<ResponseCreate>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
