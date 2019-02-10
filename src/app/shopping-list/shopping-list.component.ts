import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public list = [];
  public itemName = '';
    
  constructor(private shoppingListService: ShoppingListService) {
    this.list = this.shoppingListService.listItems;
  } 

  ngOnInit() {
  }

  addItem(){
    let itemObj = {
      name: this.itemName,
      amount: 1,
      checked: false
    };

    this.shoppingListService.add(itemObj).subscribe(
      response => {
        console.log('Item adicionado com sucesso!');
        //this.shoppingListService.find();
        itemObj['id'] = response['name'];
        this.list.push(itemObj);
      },
      error =>{
        console.log('erro!');
    });
    this.itemName = '';

  }
}
