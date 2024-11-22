import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../../../websocket.service';
import { ElementRef, Renderer2 } from '@angular/core';

declare const TradingView: any;
@Component({
  selector: 'app-submainpanel',
  templateUrl: './submainpanel.component.html',
  styleUrls: ['./submainpanel.component.scss'],
  providers: [WebsocketService],
})
//https://api.binance.com/api/v3/ticker/24hr
export class SubmainpanelComponent implements OnInit {
  tpNoo: number = 1;
  price: number = 12341;
  percent1: number = 0.5;
  amount: number = 213123;
  percent2: number = 14.5;

  selectedItem1: string | undefined;
  selectedItem2: string | undefined;
  //tickertitles: any[] = [];
  tickerdatas: { [key: string]: any } = {};
  coinone: string;
  cointwo: string;
  symbol: string;
  siteUrl = environment.siteUrl;
  private intervalId: any;

  dropdownOptions1: any[] = [
    { label: 'SETTINGS TEMPLATE', value: 'diabled' },
    { label: '0. Autosave every 5 sec', value: 'option1' },
    { label: 'Add New Template', value: 'option1' },
  ];

  dropdownOptions2: any[] = [
    { label: 'Off', value: 'diabled' },
    { label: 'Seconds', value: 'option1' },
  ];

  tpcontent: boolean = false;
  SLXcontent: boolean = false;
  triggercontent: boolean = true;
  calccontent: boolean = false;
  slxcontent2: boolean = false;

  slradio: boolean = false;
  isToggledg = false;

  selectedItem: string | undefined;

  dropdownOptions: any[] = [
    { label: 'disabled', value: 'diabled' },
    { label: '1m candle', value: 'option1' },
    { label: '5m candle', value: 'option1' },
    { label: '1h candle', value: 'option1' },
    { label: '4h candle', value: 'option1' },
  ];

  frlSwich1: boolean = true;
  frlSwich2: boolean = true;
  frlSwich3: boolean = true;
  frlSwich4: boolean = true;
  frlSwich5: boolean = true;
  frlSwich6: boolean = true;

  // FRL swich end

  isToggledf = false;
  activeButton6: string = 'btn16';

  setActiveButton6(buttonId: string) {
    this.activeButton6 = buttonId;
  }
  activeButton7: string = 'btn18';
  setActiveButton7(buttonId: string) {
    this.activeButton7 = buttonId;
  }

  activeButton4: string = 'btn11';
  setActiveButton4(buttonId: string) {
    this.activeButton4 = buttonId;
  }
  activeButton5: string = 'btn13';
  setActiveButton5(buttonId: string) {
    this.activeButton5 = buttonId;
  }

  value: number = 50;
  isToggled = false;
  ingredient!: string;
  activeButton3: string = 'btn8';
  setActiveButton3(buttonId: string) {
    this.activeButton3 = buttonId;
  }
  activeButton: string = 'btn1';

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }
  activeButton2: string = 'btn4';
  setActiveButton2(buttonId: string) {
    this.activeButton2 = buttonId;
  }

  showContent = false;
  showContent2 = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }
  toggleContent2() {
    this.showContent2 = !this.showContent2;
  }

  hoveredRowIndex: number | null = null;
  newLongorderData: any[] = [
    {
      col1: '20 022.74',
      col2: '1,92783',
      col3: '38 600,400',
    },
    {
      col1: '20 022.74',
      col2: '1,92783',
      col3: '38 600,400',
    },
    {
      col1: '20 022.74',
      col2: '1,92783',
      col3: '38 600,400',
    },
    {
      col1: '20 022.74',
      col2: '1,92783',
      col3: '38 600,400',
    },
    {
      col1: '20 022.74',
      col2: '1,92783',
      col3: '38 600,400',
    },
  ];

  // icon todo list start
  tname: any;
  pkey: any;

  newItem: any = {}; // Object to hold the form data
  items2: any[] = []; // Array to store the data
  submitToDo() {
    const obj = {
      templatename: this.tname,
      templatekey: this.pkey,
    };
    if (
      this.tname != null &&
      this.tname != undefined &&
      this.pkey != null &&
      this.pkey != undefined
    ) {
      this.items2.push(obj);
      this.tname = '';
      this.pkey = '';
    }
  }

  DeleteArray(indexxx: any) {
    this.items2.splice(indexxx, 1);
    console.log('delete ', indexxx);
  }

  updateArray(var1: any, var2: any, ind: any) {
    const obj = {
      templatename: var1,
      templatekey: var2,
    };
    this.items2[ind] = obj;
  }

  // icon todo list end

  itemsDrop1: string[] = ['USD', 'INR', 'EUR'];
  itemsDrop2: string[] = ['ALT', 'INR', 'EUR'];
  constructor(
    private profile: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private websocket: WebsocketService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  navigateTo(value: any) {
    if (value) {
      window.location.href = this.siteUrl + '/app/panel' + '/' + value;
    }
    return false;
  }

  id: number | any;
  onCLickedButton(id: number) {
    this.id = id;
  }
  products = [
    {
      name: 'aahshs',
      code: 1233,
      category: 'folwer',
    },
  ];

  // chart end
  //dropdown 2
  cities2: any;
  selectedCity2: any | undefined;
  //dropdown 1
  cities: any;
  selectedCity: any | undefined;

  //tabview 1
  data: any[] = [
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: '1INCH.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol2: '18.57',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'Aave.',
      pair2: 'BTC',
      pricevol1: '0.003133',
      pricevol12: '87.82 ',
      change: '-0.32',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00000192',
      pricevol12: '15.37',
      change: '4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'ADX.',
      pair2: 'BTC',
      pricevol1: '0.00000741',
      pricevol12: '7.81 ',
      change: '-1.59',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'ADA.',
      pair2: 'BTC',
      pricevol1: '0.00002330',
      pricevol12: '305.07 ',
      change: '-1.19',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
    {
      imageUrl: '../../../../../assets/etherium.png',
      pair1: 'AGIX.',
      pair2: 'BTC',
      pricevol1: '0.00003199',
      pricevol12: '18.57 ',
      change: '-4.25',
    },
  ];
  sliderValue: number = 0;

  updateValue() {
    // Handle input changes if needed
  }

  moveSliderBy10Percent() {
    this.sliderValue = 10;
    // if (this.sliderValue > 100) {
    //   this.sliderValue = 100;
    // }
  }
  moveSliderBy25Percent() {
    this.sliderValue = 25;
  }
  moveSliderBy30Percent() {
    this.sliderValue = 30;
  }
  moveSliderBy50Percent() {
    this.sliderValue = 50;
  }
  moveSliderBy75Percent() {
    this.sliderValue = 75;
  }
  moveSliderBy100Percent() {
    this.sliderValue = 100;
  }
  ngOnInit() {
    this.longbye = true;
    this.shortsell = false;

    this.cities2 = [
      { name: 'ALT', code: 'NY' },
      { name: 'INR', code: 'RM' },
      { name: 'EUR', code: 'LDN' },
    ];
    this.cities = [
      { name: 'USD', code: 'NY' },
      { name: 'INR', code: 'RM' },
      { name: 'EUR', code: 'LDN' },
    ];

    this.allticker();

    const symbol = this.route.snapshot.paramMap.get('symbol');

    this.getWebsocket();

    // this.intervalId = setInterval(() => {
    //   this.getWebsocket();
    // }, 5000);

    //this.tickerupdate();
  }

  allticker() {
    this.profile.allticker().subscribe(
      (data) => this.handlesuccess(data),
      (error) => this.handleError(error)
    );
  }
  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      const symbol = params.get('symbol');
      if (symbol) {
        this.initializeTradingView(symbol);
      }
    });
    // new TradingView.widget({
    //   autosize: true,
    //   symbol: 'BINANCE:'+symbol,
    //   interval: 'D',
    //   timezone: 'Etc/UTC',
    //   theme: 'dark',
    //   style: '1',
    //   locale: 'in',
    //   enable_publishing: false,
    //   allow_symbol_change: true,
    //   container_id: 'tradingview_bac65',
    //   withdateranges: true,
    //   hide_side_toolbar: false,
    // });
  }

  initializeTradingView(symbol: string): void {
    new TradingView.widget({
      autosize: true,
      symbol: 'BINANCE:' + symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'in',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_bac65',
      withdateranges: true,
      hide_side_toolbar: false,
    });
  }

  activeIndex: number = 0;

  //tabview 1
  data1: any[] = [
    {
      id: '100-50023',
      type: 'SHORT',
      pair1: 'XLM.',
      pair2: 'USTD',
      amount: '1.0',
      sl: '-3.13%',
      avgprice: '0.6702',
      tp: '2.82%',
      sum: '0.6684',
      created1: '18:55:34',
      created2: '11.24',
    },
  ];

  //short sell

  frlSwich1ss: boolean = true;
  frlSwich2ss: boolean = true;
  frlSwich3ss: boolean = true;
  frlSwich4ss: boolean = true;
  frlSwich5ss: boolean = true;
  frlSwich6ss: boolean = true;

  // FRL swich end
  activeButton21: string = 'btn21';
  setActiveButton21(buttonId: string) {
    this.activeButton21 = buttonId;
  }

  activeButton22: string = 'btn24';
  setActiveButton22(buttonId: string) {
    this.activeButton22 = buttonId;
  }

  activeButton23: string = 'btn28';
  setActiveButton23(buttonId: string) {
    this.activeButton23 = buttonId;
  }

  activeButton24: string = 'btn31';
  setActiveButton24(buttonId: string) {
    this.activeButton24 = buttonId;
  }

  activeButton25: string = 'btn33';
  setActiveButton25(buttonId: string) {
    this.activeButton25 = buttonId;
  }

  activeButton26: string = 'btn36';
  setActiveButton26(buttonId: string) {
    this.activeButton26 = buttonId;
  }

  activeButton27: string = 'btn38';
  setActiveButton27(buttonId: string) {
    this.activeButton27 = buttonId;
  }

  activeButton28: string = 'btn28';
  setActiveButton28(buttonId: string) {
    this.activeButton28 = buttonId;
  }

  isToggledss = false;
  isToggledss2 = false;
  isToggledss3 = false;

  sliderValue1: number = 0;

  updateValue1() {
    // Handle input changes if needed
  }
  moveSliderBy10Percent1() {
    this.sliderValue1 = 10;
    // if (this.sliderValue > 100) {
    //   this.sliderValue = 100;
    // }
  }
  moveSliderBy25Percent1() {
    this.sliderValue1 = 25;
  }
  moveSliderBy30Percent1() {
    this.sliderValue1 = 30;
  }
  moveSliderBy50Percent1() {
    this.sliderValue1 = 50;
  }
  moveSliderBy75Percent1() {
    this.sliderValue1 = 75;
  }
  moveSliderBy100Percent1() {
    this.sliderValue1 = 100;
  }
  //short sell end

  longbye: any;
  shortsell: any;

  changeStatusLonBuy() {
    this.longbye = true;
    this.shortsell = false;
  }
  changeStatusShortSell() {
    this.shortsell = true;
    this.longbye = false;
  }

  // long buy active and short
  shotlongbtn: string = 'long1';

  changeActiveBtn(buttonId: string) {
    this.shotlongbtn = buttonId;
  }
  productsSignalLog: any[] = [];
  itemsDrop3: string[] = ['All', 'Init', 'Processing', 'Skip'];
  searchicon: boolean = false;
  serach123() {
    this.searchicon = !this.searchicon;
  }

  handleError(error: any) {
    console.log(error);
  }

  handlesuccess(data: any) {
    const res = data.result;

    this.tickerdatas = res;
    this.coinone = data.coinone;
    this.cointwo = data.cointwo;
    this.symbol = data.symbol;
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectValues(obj: { [key: string]: any }): any[] {
    return Object.values(obj).reduce((acc, val) => acc.concat(val), []);
  }

  // initializeTradingViewWidget(): void {
  //   if (this.symbol) {
  //     new TradingView.widget({
  //       autosize: true,
  //       symbol: 'BINANCE:' + this.symbol,
  //       interval: 'D',
  //       timezone: 'Etc/UTC',
  //       theme: 'dark',
  //       style: '1',
  //       locale: 'in',
  //       enable_publishing: false,
  //       allow_symbol_change: true,
  //       container_id: 'tradingview_bac65',
  //       withdateranges: true,
  //       hide_side_toolbar: false,
  //     });
  //   }
  // }

  getWebsocket() {
    this.websocket.GetSingleInstanceStatus().subscribe(
      (data) => this.handletickerResponse(data),
      (error) => this.handleError(error)
    );
  }

  handletickerResponse(data) {
    data.forEach((item) => {
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.s
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.s
      );
      if (element) {
        this.renderer.setProperty(element, 'innerHTML', item.c);
        this.renderer.setProperty(element1, 'innerHTML', item.P);

        if (item.P < 0) {
          this.renderer.setStyle(element1, 'background-color', 'red');
        } else {
          this.renderer.setStyle(element1, 'background-color', 'green');
        }
      } else {
        //console.log('Element not found for class: .last_price_' + item.s);
      }
    });
  }

  // tickerupdate() {
  //   setTimeout(() => {
  //     this.profile.tickerpriceupdate().subscribe(
  //       (data) => this.handletickerupdate(data),
  //       (error) => this.handleError(error)
  //     );
  //   }, 20000);
  // }

  handletickerupdate(data) {
    alert('lll');
    let datas = data.data;
    console.log(datas);
    datas.forEach((item) => {
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.symbol
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.symbol
      );
      if (element) {
        this.renderer.setProperty(element, 'innerHTML', item.lastPrice);
        this.renderer.setProperty(element1, 'innerHTML', item.priceChangePercent);

        if (item.P < 0) {
          this.renderer.setStyle(element1, 'background-color', 'red');
        } else {
          this.renderer.setStyle(element1, 'background-color', 'green');
        }
      } else {
        //console.log('Element not found for class: .last_price_' + item.s);
      }
    });
  }

}
