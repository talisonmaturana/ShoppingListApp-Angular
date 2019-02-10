import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor() { }

  canActivate(): boolean{
    console.log('CanActivate was called!');
    return true;
  }
}
