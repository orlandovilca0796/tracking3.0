import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService:LoadingService) { }

  isLoading$ = this.loadingService.isLoading$;

  ngOnInit(): void {
  }

}
