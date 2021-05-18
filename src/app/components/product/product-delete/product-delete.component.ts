import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../product.service";
import {  User } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  user:  User = {
    name: '',
    date: '',
    address: '',
    cpf: '',
    telephone:'',
    email: '',
  }
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl(''),
    cpf: new FormControl(''),
    telephone: new FormControl(''),
    address: new FormControl(''),
  });


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((user) => {
      this.user = user;
    });

  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((user) => {
      this.updateForm(user[0]);
    });
    this.form.disable()
  }

  deleteProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto excluido com sucesso!");
      this.router.navigate(["users"]);
    });
  }

  updateForm(user){
    console.log(this.form.value)
    this.form.setValue({
      name: user.name,
      email: user.email,
      date: user.date,
      cpf: user.cpf,
      telephone: user.telephone,
      address: user.address
    });
  }

  cancel(): void {
    this.router.navigate(["/users"]);
  }
}
