import { User } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  user: User = {
    name: '',
    date: '',
    address: '',
    cpf: '',
    telephone:'',
    email: '',
  }

  constructor(private productService: ProductService,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.user).subscribe(() => {
      this.productService.showMessage('Usuário criado!')
      this.router.navigate(['users'])
    })

  }

  cancel(): void {
    this.router.navigate(['/users'])
  }
}
