import { Component, OnInit } from '@angular/core';
import { Lender } from '../../lender';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Kiva } from 'src/kiva-response';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Transactions } from 'src/TDReponse';
import { Customers } from 'src/customers';
import $ from 'jquery';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  loans: Lender[];
  opportunities: Lender[];
  accountId: string = "f5058d61-3918-4532-ad1a-d344407aea10";
  cashBackBalance: number = 0;
  kivaBalance: number = 0;
  balanceSwapped = false;
  loadingBalance = false;
  customername : string; 
  CustomerId:string;
  hideModal = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getKiva();
    this.getBalance(this.accountId);
  }

  async getKiva() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const res = await this.http.get<Kiva>("https://api.kivaws.org/v1/loans/newest.json?page=1&per_page=5", httpOptions).pipe(
      tap(_ => console.log("Fetched"),
        catchError(this.handleError<Kiva>('Get Transaction Data')
        ))).toPromise();
    this.loans = res.loans;
    console.log(this.loans);

    const res2 = await this.http.get<Kiva>("https://api.kivaws.org/v1/loans/newest.json?page=2&per_page=5", httpOptions).pipe(
      tap(_ => console.log("Fetched"),
        catchError(this.handleError<Kiva>('Get Transaction Data')
        ))).toPromise();
    this.opportunities = res2.loans;

    console.log(this.opportunities);

    return res;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("error");
      return of(result as T);
    };
  }

  async getBalance(accountId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiNGU5YjhjYjEtYjNhZC0zYzNmLWJjNjItMTVkZTRmOGJjZDk0IiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmNDYzNjA2Mi03YzkzLTQyMmItOTNhYi1kYmE5MmY2NzgzMjIifQ.2Ec3xxzowUx47TRsYVK4G2Mz4WDDpV46ZszKpknAokM" })
    };
    const response = await this.http.get<Transactions>("https://api.td-davinci.com/api/accounts/" + accountId + "/transactions", httpOptions).pipe(
      tap(_ => console.log("Fetched"),
        catchError(this.handleError<Transactions>('Get Transaction Data')
        ))).toPromise();
    const transactions = response.result;
    let totalTransactions = 0;
    for(let transaction of transactions){
      totalTransactions+= transaction.currencyAmount;
    }
    this.cashBackBalance = totalTransactions*.02;
    this.CustomerId = transactions.customerId;
    console.log(this.CustomerId)
    this.getCustomerName(this.CustomerId);
  }

  async getCustomerName(CustomerId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiNGU5YjhjYjEtYjNhZC0zYzNmLWJjNjItMTVkZTRmOGJjZDk0IiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmNDYzNjA2Mi03YzkzLTQyMmItOTNhYi1kYmE5MmY2NzgzMjIifQ.2Ec3xxzowUx47TRsYVK4G2Mz4WDDpV46ZszKpknAokM" })
    };
    const response = await this.http.get<Customers>("https://api.td-davinci.com/api/customers/" + CustomerId , httpOptions).pipe(
      tap(_ => console.log("Fetched"),
        catchError(this.handleError<Customers>('Get customer Data')
        ))).toPromise();
    const transactions = response.result;
    this.customername = transactions.givenName;
    
  }

  transferBalance(){
    if(!this.balanceSwapped){
      this.loadingBalance = true;
      setTimeout(() => 
      {
        this.hideModal = false;
        this.kivaBalance = this.cashBackBalance;
        this.cashBackBalance = 0;
        this.balanceSwapped = true;
        this.loadingBalance = false;
        
      }, 1000);
      
    }

  }
}
