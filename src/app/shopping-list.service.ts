import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public listItems: any[] = [];

  itemsRef: AngularFireList<any[]>;
  listItemsFirebase: Observable<any[]>;

  constructor(private afDB: AngularFireDatabase) { 
    this.itemsRef = afDB.list('items', ref => ref.orderByChild('checked'));
  }

  find(){
    this.httpClient.get(environment.firebase.databaseURL + '/items.json').subscribe(response => {
      this.listItems = Object.keys(response).map(id => {
        let item = response[id];
        item.id = id;
        return item
      });
    });
  }

  add(newItem: any): /*void*/  Observable<Object> {
    //this.listItems.push(newItem);
    return this.httpClient.post(environment.firebase.databaseURL + '/items.json', newItem);
  }

  
  /*Lista Estatica
  remove(itemName){
    let index = this.listItems.findIndex(item => item.name === itemName);
    this.listItems.splice(index, 1);
  }*/

  //Firebase
  remove(itemId){
    return this.httpClient
    .delete(environment.firebase.databaseURL + `/items/${itemId}.json`)
    .subscribe(
      response =>{
        console.log('Item removido com sucesso!');
        let foundIndex = this.listItems.findIndex(item => item.id === itemId);
        this.listItems.splice(foundIndex,1)
      },
      error => {
        console.log('Deu erro!');
      }
    );
  }

  /*Lista Estatica
  check(itemName){
    let foundItem = this.listItems.find(item => item.name === itemName);
    foundItem.checked = true;
  }*/

  //Firebase
  check(editItem) {
    let itemobj = { ...editItem };
    itemobj.checked = true;
    itemobj.amount = 0;

    return this.httpClient
      .put(environment.firebase.databaseURL 
        + `/items/${editItem.id}.json`, itemobj);
  }
}
