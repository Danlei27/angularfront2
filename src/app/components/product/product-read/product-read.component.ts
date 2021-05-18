import { ProductService } from './../product.service';
import { ResponseUsers } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  users: ResponseUsers[]
  displayedColumns = ['id', 'name',  'email','cpf','date','telephone','address','action']
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(users => {
      this.users = users
    })
  }

}
