import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { IntermediateService } from '../Services/intermediate.service';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent {
  // Variable to track the opened section index
  openedIndex: number | null = null;
  marketData: any;

  trades: any[] = [];
  topvolume: any[] = [];
  topGains: any[] = [];
  losers: any[] = [];
  market_top: any[] = [];
  newListings: any[] = [];
  trendingPairs: any[] = [];

  constructor(
    private myservice: IntermediateService,
    private Token: TokenService,
    private Auth: AuthService
  ) {}
  ngOnInit() {
    setInterval(() => {
      this.loadMarketData();
    }, 6000);
  }
  // Toggle the section on click
  toggleSection(index: number) {
    // Toggle the same section (open/close)
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  loadMarketData() {
    this.myservice.getMarketData().subscribe(
      (response: any) => {
        // Set `response` as `any` type
        console.log(response);
        if (response.success) {
          this.trades = response.trades;
          this.topvolume = response.topvolume;
          this.topGains = response.top_gains;
          this.losers = response.losers;
          this.market_top = response.market_top;
          this.newListings = response.newListings;
          this.trendingPairs = response.trendingPairs;
        }
      },
      (error) => {
        console.error('Error fetching market data:', error);
      }
    );
  }

  onImageError(event: Event): void {
    // Access the image element and change its src attribute
    (event.target as HTMLImageElement).src = '/assets/images/color/eth.svg';
  }
}