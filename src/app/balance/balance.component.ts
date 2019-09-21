import { Component, OnInit } from '@angular/core';
import {Lender} from '../../lender';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Kiva } from 'src/kiva-response';
import {catchError, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  loans: Lender[];
  opportunties: Lender[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getKiva();
  }

  async getKiva(){
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
    this.opportunties = res2.loans;
    
    console.log(this.opportunties);

    return res;
  }
  


private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log("error");
    return of(result as T);
  };
}
}
