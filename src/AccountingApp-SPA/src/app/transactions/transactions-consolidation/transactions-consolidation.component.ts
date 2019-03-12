import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/_models/account';

@Component({
  selector: 'app-transactions-consolidation',
  templateUrl: './transactions-consolidation.component.html',
  styleUrls: ['./transactions-consolidation.component.css']
})
export class TransactionsConsolidationComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}

// calcTotalTransPerAccount
