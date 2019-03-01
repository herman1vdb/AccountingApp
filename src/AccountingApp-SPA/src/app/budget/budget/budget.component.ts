import { Component, OnInit } from '@angular/core';
import { Budget } from '../../_models/budget';
import { BudgetService } from '../../_services/budget.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget: Budget[];
  constructor(private budgetService: BudgetService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.budget = data['budget'];
      console.log(this.budget);
    });
  }
}
