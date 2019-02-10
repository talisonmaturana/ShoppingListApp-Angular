import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input() shoppingItem: any = {};
  
  constructor(private service: ShoppingListService) {

  }

  ngOnInit() {
  }

  removeItem(){
    this.service.remove(this.shoppingItem.id)
  }

  checkItem(){
    this.service.check(this.shoppingItem).subscribe(
      response => {
        console.log('Item alterado com sucesso!');
        this.shoppingItem.checked = true;
        this.shoppingItem.amount = 0;
      }
    );
  }

}
