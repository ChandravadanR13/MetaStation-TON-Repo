import {
  Component,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/Services/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { OrderbookService } from 'src/app/Services/bybitorderbook.service';
import { BybitWebSocketService } from 'src/app/Services/bybit-web-socket.service';
import { BinanceOrderBookService } from 'src/app/Services/binanceorderbook.service';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoadingService } from '../../../../Services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Web3 from 'web3';
import { WalletCommunicationService } from '../../../../Services/walletcommunication.service';
import { WalletService } from 'src/app/Services/wallet.service';
import { TradeService } from 'src/app/Services/trade.service';
import { UserService } from '../../../../Services/user.service';
import { HistoryService } from '../../../../Services/history.service';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { trigger } from '@angular/animations';
import { layouts } from 'chart.js';

declare const TradingView: any;
declare let window: any;
declare const Datafeeds: any;

declare global {
  interface Window {
    TradingView: any;
    Datafeeds: any;
  }
}
interface orderBook {
  s: string;
  b: [number, number][];
  a: [number, number][];
  u: number;
  seq: number;
}

@Component({
  selector: 'app-submainpanel',
  templateUrl: './submainpanel.component.html',
  styleUrls: ['./submainpanel.component.scss'],
  providers: [WebsocketService, BybitWebSocketService],
  // encapsulation: ViewEncapsulation.None,
})
export class SubmainpanelComponent implements AfterViewInit {
  @ViewChild('elementRef') elementRef!: ElementRef;

  private subscription!: Subscription;
  private widget: any;
  tpNoo: number = 1;
  tradeorders: any[] = [];

  divArray: any[] = [];
  // priceArray: number[] = [];
  showOnlyFavorites: boolean = false;

  priceArray: { p: number; c: number }[] = [];
  amountArray: { a: number; pc: number }[] = [];

  orderBook: any[] | undefined;
  ask: [number, number][] = [];
  bid: [number, number][] = [];
  displayedAsk: [number, number][] = [];
  displayedBid: [number, number][] = [];

  activePanel!: string;
  apiKey!: string;
  apiSecret!: string;
  activeTab: 'ticker' | 'long' = 'ticker';
  hideElements = true;
  Userbalance: any;
  isLongSelected: boolean = true;

  slxEnabled: boolean = false;
  slEnabled: boolean = false;
  tpEnabled: boolean = false;

  selectedItem1: string | undefined;
  selectedItem2: string | undefined;
  //tickertitles: any[] = [];

  minQty!: number;
  maxQty!: number;
  minleverage!: number;
  maxleverage!: number;
  qtyStep!: number;
  coinone!: string;
  cointwo!: string;
  price!: number;
  triggerprice!: number;
  qty: number | null = null;
  value: number | null = null;
  priceerror: boolean = false;
  qtyerror: boolean = false;
  triggerpriceerror: boolean = false;

  showprice: boolean = true;
  showtriggerprice: boolean = false;
  symbol!: string;
  symbolId!: string;
  selectedTradeType!: string;
  selectedOrderType: string = 'Limit';
  siteUrl = environment.siteUrl;
  public lastPrice: string | undefined;
  isMinMax: boolean = false;
  isMoveExpand: boolean = false;
  isMoveShrinkTrade: boolean = false;
  activeChildtab: boolean = false;
  silderValue2: any;
  selectedAccountId: any;
  userRole: any;
  showBots: boolean = false;
  isProMode: boolean = false;
  modeText: string = 'Basic';
  tradeModeText: string = 'Spot';
  favoriteItems: any;
  activeContent: number | null = null;

  openorders: any;
  conditionalorders: any;
  tpslorder: any;
  limitmarket: any;
  conditionalhistory: any;
  tpslhistory: any;
  tradehistory: any;
  closedtrades: any;
  alltrades: any;
  childTrades: any;
  positionSingleList: any;
  positionCloseTrades: any;
  positionAllTrades: any;

  positionTrades: any;
  plOrders: any;
  plPositions: any;

  coinonebalance: number = 0;
  cointwobalance: number = 0;
  decimal: number = 0;
  basedecimal: number = 0;
  qoutedecimal: number = 0;
  highlightText: string = 'Short';
  type: string = 'Buy';

  metaMForm: FormGroup;
  pairid: number = 0;
  public loading;
  isDisabled: boolean = false;
  public error = null;
  web3: any;
  symbols: string[] = [];

  activation: any[] = [];

  tpcontent: boolean = false;
  SLXcontent: boolean = false;
  triggercontent: boolean = true;
  calccontent: boolean = false;
  slxcontent2: boolean = false;

  slradio: boolean = false;
  isToggledg = false;

  selectedItem: string | undefined;

  showOrder: boolean = true;

  dropdownOptions: any[] = [
    { label: 'disabled', value: 'diabled' },
    { label: '1m candle', value: 'option1' },
    { label: '5m candle', value: 'option1' },
    { label: '1h candle', value: 'option1' },
    { label: '4h candle', value: 'option1' },
  ];

  activeButton3: string = 'btn8';
  activeButton: string = 'btn1';
  activeButton2: string = 'btn4';

  // isTickerOpen = false;
  isTickerOpen: boolean = false;

  searchTerm: string = '';

  toggleTicker(): void {
    this.isTickerOpen = !this.isTickerOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close the ticker if clicked outside
    if (this.isTickerOpen && !this.el.nativeElement.contains(event.target)) {
      this.isTickerOpen = false;
    }
  }
  showContent = false;
  showContent2 = false;

  slXForm = {
    slxtype: 'price',
    profitpercentage: null,
    offset: null,
    trailingpercentage: null,
    trailoffset: null,
    trailStep: null,
    minvalue: null,
    orderTrigger: '',
    slXOrderType: '',
    activation: '',
  };

  tPForm = {
    orderType: '',
    orderTigger: '',
    price: 0.0,
    qty: 0.0,
    triggerprice: '',
    symbol: '',
    orderID: '',
    rearrange: 0,
  };

  tPForms: Array<{
    price: number;
    qty: number;
  }> = [];

  constructor(
    private walletService: WalletService,
    private profile: ProfileService,
    private trade: TradeService,
    private router: Router,
    private route: ActivatedRoute,
    private websocket: WebsocketService,
    private bybitwebsocket: BybitWebSocketService,
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private isloading: LoadingService,
    private toastr: ToastrService,
    private walletCommunicationService: WalletCommunicationService,
    private ngZone: NgZone,
    private userService: UserService,
    private history: HistoryService
  ) {
    this.loading = isloading;
    this.metaMForm = this.fb.group({
      amount: ['', Validators.required],
      address: ['', Validators.required],
      send: ['', Validators.required],
      rec: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.selectedTradeType = localStorage.getItem('type') ?? 'spot';

    this.route.url.subscribe((segments: string | any[]) => {
      const lastSegment = segments[segments.length - 1];
      if (lastSegment) {
        this.symbol = lastSegment.toString();
      }
    });

    this.filteredTradepairs = this.tradepairs;

    await this.pairInfo();

    this.isLoading = false;

    this.getSl();
    this.getTp();
    this.getSlx();

    this.activePanel = 'coin';
    this.longbye = true;
    this.shortsell = false;
    this.showOrder = true;
    const role = await this.setUserRole();

    this.favoriteItems = this.getFavoritePairsFromLocalStorage();
    this.loadFavorites();

    this.orderTig = [
      { name: 'LastPrice', code: 'LastPrice' },
      { name: 'MarkPrice', code: 'MarkPrice' },
      { name: 'IndexPrice', code: 'IndexPrice' },
    ];

    this.isProMode = false;
    this.tradeModeText =
      this.selectedTradeType == 'linear' ? 'Perpetuals' : 'Spot';
    this.modeText = 'Basic';

    this.openorders = [];
    this.closedtrades = [];
    this.alltrades = [];
    this.positionTrades = [];

    this.allticker();
    this.showtradeBot();
    this.generateDivs();
    this.getWebsocket();
  }

  // onSearch(): void {
  //   if (this.searchTerm.trim()) {
  //     this.filteredTradepairs = this.tradepairs.filter((item) =>
  //       item.coinone.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   } else {
  //     // If the search term is cleared, show all items again
  //     this.filteredTradepairs = this.tradepairs;
  //   }
  // }

  async pairInfo() {
    try {
      const type = this.selectedTradeType;
      const data: any = await this.profile.getInfo(type, this.symbol);

      this.coinone = data.coinone;
      this.cointwo = data.cointwo;
      this.decimal = data.decimal;
      this.basedecimal = data.basedecimal;
      this.qoutedecimal = data.qoutedecimal;

      this.symbol = data.symbol;
      this.price = data.lastprice;
      this.tPForm.price = data.lastprice;
      this.minleverage = data.minl;
      this.maxleverage = data.maxl;
      this.qtyStep = data.qtyStep;
      this.lastPrice = data.lastprice;
      this.maxQty = data.maxq;

      this.updatecurrentbalance();
    } catch (error) {
      this.handleError(error);
    }
  }

  allticker() {
    this.profile.allticker().subscribe(
      (data: any) => this.handleGetPairs(data),
      (error: any) => this.handleError(error)
    );
  }

  ngAfterViewInit() {
    if (this.symbol) {
      this.symbolId = this.symbol;
      this.initializeTradingView(this.symbol);
      this.bybitwebsocket.disconnectWebSocket();
      this.bybitwebsocket.connectWebSocket(this.symbol, this.selectedTradeType);
      this.ask = [];
      this.bid = [];
      this.bybitwebsocket.orderBook$.subscribe((data) => {
        const orderBookData = data as {
          a?: [number, number][];
          b?: [number, number][];
        };
        this.updateOrderBookData(orderBookData.a || [], orderBookData.b || []);
      });
    }

    this.adjustTabIndex();

    setInterval(async () => {
      await this.getpositionList();
      await this.CloseTrade();
      await this.updateHistoryPanel();
    }, 100000);

    this.getLeverage();
    // this.isLoading = false;
  }

  navigateTo(value: any) {
    if (value) {
      // const headerElement = this.el.nativeElement.querySelector('.livehead_price_' +this.symbol);
      // this.renderer.setProperty(headerElement,'innerHTML','--');
      const selectedTab = this.tabList[this.selectedTabIndex];
      this.selectedTradeType = selectedTab == 'spot' ? 'spot' : 'linear';
      localStorage.setItem('type', this.selectedTradeType);

      this.router.navigateByUrl(`/app/panel/${value}`);
      this.symbol = value;
      this.initializeTradingView(this.symbol);
      this.bybitwebsocket.disconnectWebSocket();
      this.bybitwebsocket.connectWebSocket(this.symbol, this.selectedTradeType);
      this.pairInfo();
      this.getLeverage();
      this.changeTradeType();
      this.qty = null;
      this.value = null;
    }
    return false;
  }

  tabList: any;
  coinList: any;
  res: any;
  tradepairs: any[] = [];
  filteredTradepairs: Array<any> = [];

  spottradepairs: { [key: string]: any } = {};
  datas: { [key: string]: any } = {};

  selectedTabIndex: number = 0;

  adjustTabIndex() {
    this.selectedTabIndex = this.selectedTradeType == 'linear' ? 1 : 0;
  }

  selectTab(index: number, tab: string) {
    this.selectedTabIndex = index;
    const selectedTab = this.tabList[this.selectedTabIndex];
    this.coinList = Object.keys(this.res[selectedTab]);
    this.tradepairs = this.res[selectedTab][this.coinList[0]];
    // this.changeTradeType();
  }

  selectCoin(coin: string) {
    const selectedTab = this.tabList[this.selectedTabIndex];
    this.tradepairs = this.res[selectedTab][coin];
  }

  // handleGetPairs(data: any) {
  //   this.res = data.result;
  //   this.tabList = Object.keys(this.res);
  //   const selectedTab = this.tabList[this.selectedTabIndex];
  //   this.coinList = Object.keys(this.res[selectedTab]);
  //   if (this.coinList.length > 0) {
  //     this.tradepairs = this.res[selectedTab][this.coinList[0]];
  //   } else {
  //     this.tradepairs = [];
  //   }
  // }
  handleGetPairs(data: any) {
    this.res = data.result;
    this.tabList = Object.keys(this.res);
    const selectedTab = this.tabList[this.selectedTabIndex];
    this.coinList = Object.keys(this.res[selectedTab]);
    if (this.coinList.length > 0) {
      this.tradepairs = this.res[selectedTab][this.coinList[0]];
      this.filteredTradepairs = [...this.tradepairs]; // Initialize filtered list
    } else {
      this.tradepairs = [];
      this.filteredTradepairs = [];
    }
  }
  
  filterTradepairs(): void {
    if (this.searchTerm.trim()) {
      this.filteredTradepairs = this.tradepairs.filter((item) =>
        item.coinone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTradepairs = [...this.tradepairs]; // Reset to full list if search is cleared
    }
  }
  // filterTradepairs(): void {
  //   if (this.searchTerm.trim()) {
  //     this.filteredTradepairs = this.tradepairs.filter((item) =>
  //       item.coinone.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   } else {
  //     this.filteredTradepairs = this.tradepairs;
  //   }
  // }

  async changeTradeType() {
    this.tradeModeText =
      this.selectedTradeType == 'spot' ? 'Spot' : 'Perpetuals';
    const tradeType = this.selectedTradeType == 'spot' ? 'spot' : 'linear';

    this.qty = null;
    this.value = null;

    localStorage.setItem('type', tradeType);
    this.updateHistoryPanel();
    this.showtradeBot();
    // await this.allticker();
    this.calculatepercentage(this.sliderValue1);
    this.selectedTradeType = tradeType;
    this.walletCommunicationService.setSelectedTradeType(tradeType);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  toggleShowFavorites(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }

  getFilteredPairs(pairs: any[]): any[] {
    if (this.showOnlyFavorites) {
      return pairs.filter((item) => this.isFavorite(item.symbol));
    } else {
      return pairs.sort((a, b) => {
        const aFavorite = this.isFavorite(a.symbol) ? 1 : 0;
        const bFavorite = this.isFavorite(b.symbol) ? 1 : 0;
        // Sort descending: favorites first
        return bFavorite - aFavorite;
      });
    }
  }

  isFavorite(symbol: string): boolean {
    return this.favoriteItems.has(symbol);
  }

  getWebsocket() {
    this.websocket.GetSingleInstanceStatus().subscribe(
      (data) => this.handletickerResponse(data),
      (error) => this.handleError(error)
    );
  }

  handletickerResponse(data: any) {
    data.forEach((item: any) => {
      const headerElement = this.el.nativeElement.querySelector(
        '.livehead_price_' + item.s
      );
      const headerElementVol = this.el.nativeElement.querySelector(
        '.livehead_vol_' + item.s
      );
      const headerElementHigh = this.el.nativeElement.querySelector(
        '.livehead_high_' + item.s
      );
      const headerElementLow = this.el.nativeElement.querySelector(
        '.livehead_low_' + item.s
      );
      const headerElementChange = this.el.nativeElement.querySelector(
        '.livehead_change_' + item.s
      );
      if (headerElement) {
        this.renderer.setProperty(
          headerElement,
          'innerHTML',
          parseFloat(item.c)
        );
        this.renderer.setProperty(
          headerElementVol,
          'innerHTML',
          parseFloat(item.v).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementHigh,
          'innerHTML',
          parseFloat(item.h).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementLow,
          'innerHTML',
          parseFloat(item.l).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementChange,
          'innerHTML',
          parseFloat(item.P).toFixed(2)
        );
      }
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.s
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.s
      );
      const lp = this.el.nativeElement.querySelectorAll('.liveprice' + item.s);

      //Update last price in position
      if (lp) {
        lp.forEach((lpElement: any) => {
          this.renderer.setProperty(lpElement, 'innerHTML', parseFloat(item.c));
        });
      }

      if (element) {
        this.renderer.setProperty(
          element,
          'innerHTML',
          item.c.toString().replace(/(\.\d*?[1-9])0*$/, '$1')
        );
        this.renderer.setProperty(
          element1,
          'innerHTML',
          parseFloat(item.P).toFixed(2)
        );
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

  handletickerupdate(data: any) {
    let datas = data.data;
    datas.forEach((item: any) => {
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.symbol
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.symbol
      );
      if (element) {
        this.renderer.setProperty(
          element,
          'innerHTML',
          item.lastPrice.toString().replace(/(\.\d*?[1-9])0*$/, '$1')
        );
        this.renderer.setProperty(
          element1,
          'innerHTML',
          item.priceChangePercent
        );
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

  calculatepercentage(percent: any) {
    const type = this.getType();
    const pointvalue = type === 'linear' ? this.decimal : this.basedecimal;
    const price =
      this.selectedOrderType === 'Market' || this.selectedOrderType === 'Float'
        ? this.lastPrice || 0
        : this.price;
    const percentage = percent / 100;
    const coinbal =
      this.type === 'Sell' && type === 'spot'
        ? this.coinonebalance
        : this.cointwobalance;
    const leverage = type === 'linear' ? this.leverage : 1;
    const leveragebal = coinbal * leverage;
    const balance = leveragebal * percentage;
    const total =
      this.type === 'Sell' && type === 'spot'
        ? Number(balance) * Number(price)
        : Number(balance) / Number(price);
    const roundedBalance = this.adjustQtyStep(balance);
    const roundedTotal = this.adjustQtyStep(total);
    this.qty =
      total > 0
        ? this.type == 'Buy' || type == 'linear'
          ? roundedTotal
          : roundedBalance
        : parseFloat((0).toFixed(pointvalue));
    this.value =
      total > 0
        ? this.type === 'Buy' || type == 'linear'
          ? roundedBalance
          : roundedTotal
        : roundedTotal;
  }

  onqtyChange(): void {
    const type = this.getType();
    const pointvalue = type == 'linear' ? this.decimal : this.qoutedecimal;
    const price =
      this.selectedOrderType === 'Market' || this.selectedOrderType === 'Float'
        ? this.lastPrice || 0
        : this.price;
    const amount = this.qty ? this.qty : 0;
    const total = Number(price) * amount;
    this.value =
      total > 0
        ? parseFloat(total.toFixed(pointvalue))
        : parseFloat((0).toFixed(pointvalue));
  }

  onValuechange(): void {
    const type = this.getType();
    const pointvalue = type === 'linear' ? this.decimal : this.basedecimal;
    const price =
      this.selectedOrderType === 'Market' || this.selectedOrderType === 'Float'
        ? this.lastPrice || 0
        : this.price;
    const numericPrice = Number(price);
    if (numericPrice === 0) {
      return;
    }
    const qty = this.value ? Number(this.value) / numericPrice : 0;
    this.qty = this.adjustQtyStep(qty);
  }

  onPriceChange(): void {
    const type = this.getType();
    const pointvalue = type == 'linear' ? this.decimal : this.basedecimal;
    const price = this.price;
    const qty = this.qty ? this.qty : 0;
    const total = price * qty;
    this.value =
      total > 0
        ? parseFloat(total.toFixed(pointvalue))
        : parseFloat((0).toFixed(pointvalue));
  }

  adjustQtyStep(value: any) {
    const type = this.getType();
    const decimalPlaces =
      type == 'spot'
        ? this.basedecimal
        : this.qtyStep.toString().split('.')[1]?.length || 0;
    let adjustedValue;
    if (decimalPlaces > 0) {
      adjustedValue = parseFloat(value.toFixed(decimalPlaces));
    } else {
      adjustedValue = Math.floor(value);
    }
    return adjustedValue;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/images/color/eth.svg';
  }

  toggleContentApp(contentNumber: number) {
    // If the second button is clicked, remove class from the first content and vice versa
    this.activeContent = contentNumber;
  }
  closeContentApp() {
    this.activeContent = null;
  }
  public toggleMinMax() {
    this.isMinMax = !this.isMinMax;
  }
  public toggleMoveExpand() {
    this.isMoveExpand = !this.isMoveExpand;
  }
  public toggleMoveShrinkTrade() {
    this.isMoveShrinkTrade = !this.isMoveShrinkTrade;
  }

  toggleMode() {
    if (this.userRole == 'basic' && this.isProMode) {
      return;
    }
    if (this.isProMode) {
      this.showBots = false;
      this.modeText = 'Basic';
      this.isProMode = false;
    } else {
      this.showBots = true;
      this.modeText = 'Pro';
      this.isProMode = true;
    }
  }

  isNaN(value: any): boolean {
    return isNaN(value);
  }

  parseFloat(value: any) {
    return parseFloat(value);
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
  toggleContent2() {
    this.showContent2 = !this.showContent2;
  }

  slrearrange!: number;
  onRearrangeChangesl(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.slrearrange = 1;
    } else {
      this.slrearrange = 0;
    }
  }

  onRearrangeChangetp(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.tPForm.rearrange = 1;
    } else {
      this.tPForm.rearrange = 0;
    }
  }

  tif: string = 'GTC';
  reduceOnly: boolean = false;
  postOnly: boolean = false;

  setPostOnly(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.postOnly = checked ? true : false;
  }
  setReduceOnly(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.reduceOnly = checked ? true : false;
  }

  setTimeInForce(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.tif = selectElement.value;
  }
  getTimeInForce() {
    return this.tif;
  }

  updateHistoryPanel() {
    var type = this.getType();
    if (type == 'linear') {
      this.getpositionList();
      this.getPLPositions();
      this.getopenorderFuture();
      this.getconditionalFuture();
      this.gettpslfuture();
      this.getlimitmarketlinearhistory();
      this.getconditionorderhistorylinear();
      this.tpslorderhistory();
    } else {
      this.getconditionorderhistoryspot();
      this.getopenorderSpot();
      this.getconditionalSpot();
      this.CloseTrade();
      this.getlimitmarketspothistory();
      this.getconditionorderhistoryspot();
    }

    this.gettradehistory();
  }
  getSl() {
    this.slEnabled = localStorage.getItem('slenable') ? true : false;
  }

  setSl(event: any) {
    if (event.target.checked) {
      localStorage.setItem('slenable', 'sl');
    } else {
      localStorage.removeItem('slenable');
    }
  }

  getTp() {
    this.tpEnabled = localStorage.getItem('tpenable') ? true : false;
  }

  setTp(event: any) {
    if (event.target.checked) {
      localStorage.setItem('tpenable', 'tp');
    } else {
      localStorage.removeItem('tpenable');
    }
  }

  getSlx() {
    this.slxEnabled = localStorage.getItem('slxenable') ? true : false;
  }

  setSlx(event: any) {
    if (event.target.checked) {
      localStorage.setItem('slxenable', 'slx');
    } else {
      localStorage.removeItem('slxenable');
    }
  }

  async setUserRole() {
    try {
      this.userRole = await this.userService.getUserRole();
    } catch (error) {
      console.error('Error fetching role:', error);
    }
  }

  updateTriggerPriceTP(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.tPForm.triggerprice = inputElement.value;
  }

  stopLossPrice: number = 0;

  toggleFullscreen() {
    const elem = this.elementRef.nativeElement as HTMLElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {});
    } else {
      document.exitFullscreen();
    }
  }

  handletoggle(event: any, value: string) {
    if (event.target.checked) {
      localStorage.setItem(value + 'enable', value);
      if (value == 'tp') {
      } else if (value == 'sl') {
        // this.slClick(this.positionSingleList);
      } else if (value == 'slx') {
        // this.updateTpList(
        //   this.positionSingleList.side,
        //   this.positionSingleList.symbol
        // );
      }
    } else {
      localStorage.removeItem(value + 'enable');
    }
  }

  id: number | any;
  onCLickedButton(id: number) {
    this.id = id;
  }

  selectedCity2: any | undefined;
  selectedCity: any | undefined;
  orderTig: any;
  offset: any;
  selectedTigger: any | undefined;
  sliderValue: number = 0;

  updateValue() {
    // Handle input changes if needed
  }

  getFavoritePairsFromLocalStorage(): Set<string> {
    const favorites = localStorage.getItem('fav');
    return favorites ? new Set(JSON.parse(favorites)) : new Set<string>();
  }

  getFavoritePairs(): any[] {
    return Object.values(this.tradepairs)
      .flat()
      .filter((pair) => this.isFavorite(pair.symbol));
  }

  isLoading: boolean = false;

  classList: string[] = ['class1'];
  activeTile: string = 'class1';

  setClasses(activeClass: string) {
    this.classList = [activeClass];
    this.activeTile = activeClass;
  }

  orderbookFilter: number = 0.001;
  orderbookFilterMax: number = Number.MAX_SAFE_INTEGER;

  showtradeBot() {
    if (
      this.isProMode &&
      this.selectedTradeType == 'linear' &&
      this.userRole === 'pro'
    ) {
      this.showBots = true;
    } else {
      this.showBots = false;
    }
  }

  loadTradingViewScripts(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/charting_library/charting_library.standalone.js';
      script.onload = () => {
        const datafeedScript = document.createElement('script');
        datafeedScript.src = '/assets/datafeeds/udf/dist/bundle.js';
        datafeedScript.onload = () => {
          if (window.Datafeeds && window.Datafeeds.UDFCompatibleDatafeed) {
            resolve();
          } else {
            reject(new Error('Datafeeds or UDFCompatibleDatafeed not found.'));
          }
        };
        datafeedScript.onerror = () => {
          reject(new Error('Failed to load datafeed script'));
        };
        document.body.appendChild(datafeedScript);
      };
      script.onerror = () => {
        reject(new Error('Failed to load TradingView script'));
      };
      document.body.appendChild(script);
    });
  }

  updatecurrentbalance() {
    const data = {
      coinone: this.coinone,
      cointwo: this.cointwo,
    };
    this.walletService.updateuserbalance(data).subscribe((data: any) => {
      if (data.success) {
        this.coinonebalance = data.result[0];
        this.cointwobalance = data.result[1];
      }
    });
  }

  updateOrderBookData(
    newAsks: [number, number][],
    newBids: [number, number][]
  ) {
    if (this.ask.length > 100) {
      this.ask = [...this.ask, ...newAsks].slice(-50);
    }
    this.ask = [...this.ask, ...newAsks];
    if (this.bid.length > 100) {
      this.bid = [...this.bid, ...newBids].slice(-50);
    }
    this.bid = [...this.bid, ...newBids];
    this.applyFilter();
  }

  filterOrderbook(event?: Event) {
    if (event) {
      const selectElement = event.target as HTMLSelectElement;
      this.orderbookFilter = parseFloat(selectElement.value);

      this.orderbookFilterMax = this.orderbookFilter * 10;
      this.displayedAsk = [];
      this.displayedBid = [];
    }
    this.applyFilter();
  }

  applyFilter() {
    this.displayedAsk = this.ask.filter(
      (item) =>
        item[1] > this.orderbookFilter && item[1] < this.orderbookFilterMax
    );
    this.displayedBid = this.bid.filter(
      (item) =>
        item[1] > this.orderbookFilter && item[1] < this.orderbookFilterMax
    );
  }
  //get position list
  getpositionList() {
    this.history.positionList(this.symbol).subscribe(
      (data) => {
        this.handlepositionlistsuccess(data);
      },
      (error) => this.handleError(error)
    );
  }
  getPLPositions() {
    this.history.plPositions().subscribe(
      (data: any) => {
        if (data.success) {
          this.plPositions = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getopenorderSpot() {
    this.history.getopenorderSpot().subscribe(
      (data: any) => {
        if (data.success) {
          this.openorders = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getopenorderFuture() {
    this.history.getopenorderFuture().subscribe(
      (data: any) => {
        if (data.success) {
          this.openorders = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getconditionalSpot() {
    this.history.getconditionalorderspot().subscribe(
      (data: any) => {
        if (data.success) {
          this.conditionalorders = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getconditionalFuture() {
    this.history.getconditionalorderfuture().subscribe(
      (data: any) => {
        if (data.success) {
          this.conditionalorders = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  gettpslfuture() {
    this.history.gettpslorder().subscribe(
      (data: any) => {
        if (data.success) {
          this.tpslorder = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getlimitmarketspothistory() {
    this.history.getlimitmarketorderhistory('spot').subscribe(
      (data: any) => {
        if (data.success) {
          this.limitmarket = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  gettradehistory() {
    const type = this.getType();
    if (type) {
      this.history.gettradehistory(type).subscribe(
        (data: any) => {
          this.tradehistory = data.result;
        },
        (error) => this.handleError(error)
      );
    } else {
      console.error('Type is undefined or null.');
    }
  }
  getlimitmarketlinearhistory() {
    this.history.getlimitmarketorderhistory('linear').subscribe(
      (data: any) => {
        if (data.success) {
          this.limitmarket = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  tpslorderhistory() {
    this.history.gettpslorderhistory().subscribe(
      (data: any) => {
        if (data.success) {
          this.tpslhistory = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getconditionorderhistorylinear() {
    this.history.getcondtionalorderhistory('linear').subscribe(
      (data: any) => {
        if (data.success) {
          this.conditionalhistory = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  getconditionorderhistoryspot() {
    this.history.getcondtionalorderhistory('spot').subscribe(
      (data: any) => {
        if (data.success) {
          this.conditionalhistory = data.result;
        }
      },
      (error) => this.handleError(error)
    );
  }
  CloseTrade() {
    var type = localStorage.getItem('type');
    this.profile.closedtrades(type).subscribe(
      (data: any) => {
        let type = localStorage.getItem('type');
        let res = data.result;
        const trades = [];
        if (data.success) {
          if (type == 'spot') {
            this.closedtrades = res;
          }
          if (type == 'linear') {
            for (let i = 0; i < res.length; i++) {
              if (res[i].orderStatus === 'Filled') {
                trades.push(res[i]);
              }
            }
            this.positionCloseTrades = trades;
          }
        }
      },
      (error) => this.handleError(error)
    );
  }
  loadFavorites(): void {
    const favorites = localStorage.getItem('fav');
    this.favoriteItems = favorites
      ? new Set(JSON.parse(favorites))
      : new Set<string>();
  }
  getLeverage() {
    this.profile.getLeverage(this.symbol).subscribe(
      (data: any) => (this.leverage = data.result == 0 ? 1 : data.result),
      (error: any) => console.log('gtlev', error)
    );
  }
  closePosition(orderType: string, item: any) {
    const params: any = {
      symbol: item.symbol,
      side: item.side,
      qty: item.size,
      reduce_only: true,
      order_type: orderType,
    };
    if (orderType === 'Limit') {
      params.price = item.avgPrice;
    }
    this.profile.closepositionorder(params).subscribe(
      (response) => {
        this.updateHistoryPanel();
        this.updatecurrentbalance();
        this.toastr.success('Order closed successfully');
      },
      (error) => {
        this.toastr.error('Failed to Order closed');
        console.error('Order error:', error);
      }
    );
  }
  updateTpList(side: any, symbol: any) {
    this.profile.getTplist(side, symbol).subscribe(
      (data: any) => {
        if (data.success) {
          this.activation = [];

          for (let i = 0; i < data.result.length; i++) {
            let label = i + 1 + ' TP';
            let value = data.result[i].orderid;
            this.activation.push({ label: label, value: value });
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  initTradingViewChart(): void {
    if (!window.Datafeeds || !window.Datafeeds.UDFCompatibleDatafeed) {
      return;
    }
    const containerElement = document.getElementById('tradingview_bac65');
    const widget = new TradingView.widget({
      symbol: 'BYBIT:' + 'BTCUSDT',
      interval: 'D',
      //container_id: 'tradingview_bac65',
      container_id: containerElement,
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        'https://demo_feed.tradingview.com'
      ),
      //datafeed: new window.Datafeeds.UDFCompatibleDatafeed(environment.baseUrl),
      library_path: '/assets/charting_library/',
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
    });

    widget.onChartReady(() => {
      //this.addAnnotations(widget);
    });
    // alert('okay');
    // // Create and initialize the TradingView widget
    // const tvWidget = new window.TradingView.widget(widgetOptions);
    // alert('okayokay');
    // tvWidget.onChartReady(() => {
    //   alert('Chart has been initialized.');
    // });
  }
  addCustomMarkers(): void {
    const widget = TradingView.getWidget(this.widget.id);
    const chart = widget.activeChart();
    const tpPrice = 150;
    const slPrice = 120;
    chart.createPriceLine({
      price: tpPrice,
      color: '#00FF00',
      lineWidth: 2,
      lineStyle: 0,
      title: 'Take Profit',
    });

    chart.createPriceLine({
      price: slPrice,
      color: '#FF0000',
      lineWidth: 2,
      lineStyle: 0,
      title: 'Stop Loss',
    });
  }
  initializeTradingView(symbol: string): void {
    const isFullscreen = !!document.fullscreenElement;
    const height = isFullscreen ? '100%' : 500;

    const widget = new TradingView.widget({
      autosize: true,
      symbol: 'BYBIT:' + symbol,
      interval: 'D',
      // height: document.fullscreenElement ? '100%' : 500,
      height: height,
      width: '100%',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'in',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_bac65',
      withdateranges: true,
      hide_side_toolbar: false,
      fullscreen: true,
      customFormatters: {
        price: function (price: number) {
          const priceEvent = new CustomEvent('priceChange', { detail: price });
          window.dispatchEvent(priceEvent);
          // Return the formatted price
          return parseFloat(price.toFixed(2));
        },
      },
    });

    // Listen for the custom 'priceChange' event
    window.addEventListener('priceChange', (event: CustomEvent) => {
      const price = event.detail;
    });
  }
  activeIndex: number = 0;
  //short sell

  // FRL swich end
  activeButton21: string = 'btn21';
  setActiveButton21(buttonId: string) {
    this.activeButton21 = buttonId;
  }

  activeButton22: string = 'btn24';

  setTradeType(buttonId: string) {
    this.disableError();
    switch (buttonId) {
      case 'L':
        this.showprice = true;
        this.showtriggerprice = false;
        this.selectedOrderType = 'Limit';
        this.activeButton22 = 'btn24';
        break;
      case 'F':
        this.showprice = false;
        this.showtriggerprice = false;
        this.selectedOrderType = 'Float';
        this.activeButton22 = 'btn25';
        break;
      case 'M':
        this.showprice = false;
        this.showtriggerprice = false;
        this.selectedOrderType = 'Market';
        this.activeButton22 = 'btn26';
        break;
      case 'S':
        this.showprice = true;
        this.showtriggerprice = true;
        this.selectedOrderType = 'StopLimit';
        this.activeButton22 = 'btn27';
        break;
    }
  }

  disableError() {
    this.priceerror = false;
    this.qtyerror = false;
    this.triggerpriceerror = false;
  }
  setActive(buttonId: string) {
    this.setTradeType(buttonId);
  }

  activeButton23: string = 'btn28';
  setActiveButton23(buttonId: string) {
    this.activeButton23 = buttonId;
  }

  isToggledss = false;
  isToggledss2 = false;
  isToggledss3 = false;

  sliderValue1: number = 0;
  leverage: number = 1;

  updateValue1() {
    //this.calculatepercentage(this.sliderValue1);
  }

  updateValue2(event: any): void {
    this.leverage = event.target.value;
    // this.calculatepercentage(this.leverage);
  }

  calculateperValue(event: any): void {
    const updatedValue = event.target.value;
    this.sliderValue1 = updatedValue;
    this.calculatepercentage(updatedValue);
  }

  selectOrder(price: number, amount: number) {
    // const parsedAmount = typeof amount === 'number' ? amount : parseFloat(amount);
    // const total = parseFloat(parsedAmount.toFixed(this.decimal));
    // const res_volume = parseFloat((price * amount).toFixed(this.decimal));
    this.price = price;
  }

  saveLeverage(): void {
    let symbol = this.symbol.split('_').join('');
    const payload = { leverage: this.leverage };
    this.profile.setLeverage(symbol, this.leverage).subscribe(
      (data: any) => {
        this.getpositionList();
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  //short sell end
  longbye: any;
  shortsell: any;

  changeStatusLonBuy() {
    this.type = 'Buy';
    // this.longbye = true;
    // this.shortsell = false;
  }
  changeStatusShortSell() {
    this.type = 'Sell';
    // this.shortsell = true;
    // this.longbye = false;
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

  showslpriceerror: boolean = false;
  showslqtyerror: boolean = false;
  roiValue: number | null = null;
  slChange: number | null = null;
  slpl: number | null = null;

  calculateRoi(event: { value: number }) {
    this.showslpriceerror = false;
    this.showslqtyerror = false;
    this.slChange = null;
    this.slpl = null;

    if (this.qty != 0 && this.qty != undefined && this.price != undefined) {
      const type = this.getType();
      const pointvalue = type == 'spot' ? this.basedecimal : this.decimal;
      const roi = event.value;
      const qty = this.qty;
      const price = this.price;
      const investment = qty * price;
      const desiredloss = investment * (roi / 100);
      const finalvalue = investment - desiredloss;
      const stoplossprice = finalvalue / qty > 0 ? finalvalue / qty : 0;
      this.stopLossPrice = parseFloat(stoplossprice.toFixed(pointvalue));
    } else {
      this.showslqtyerror = true;
    }
  }

  calculatePrice(event: any) {
    this.slpl = null;
    this.roiValue = null;

    this.showslpriceerror = false;
    this.showslqtyerror = false;
    if (this.price != undefined && this.price != 0) {
      const type = this.getType();
      const pointvalue = type == 'spot' ? this.basedecimal : this.decimal;
      const percentage = event.target.value;
      const decrease = this.price * (percentage / 100);
      const newPrice = this.price - decrease > 0 ? this.price - decrease : 0;
      this.stopLossPrice = parseFloat(newPrice.toFixed(pointvalue));
    } else {
      this.showslpriceerror = true;
    }
  }

  calculateProfitandLoss(event: any) {
    this.slChange = null;
    this.roiValue = null;

    this.showslpriceerror = false;
    this.showslqtyerror = false;
    if (this.qty != 0 && this.qty != undefined && this.price != 0) {
      const type = this.getType();
      const pointValue = type === 'spot' ? this.basedecimal : this.decimal;
      const lossAmount = parseFloat(event.target.value);
      const totalInUSDT = this.price * this.qty - lossAmount;
      const requiredPrice =
        totalInUSDT / this.qty > 0 ? totalInUSDT / this.qty : 0;
      this.stopLossPrice = parseFloat(requiredPrice.toFixed(pointValue));
    } else {
      this.showslqtyerror = true;
    }
  }

  //percentage cal and qty value and price change end
  getType() {
    return localStorage.getItem('type');
  }
  //SL Start Calculation
  slvalue: any;

  validateTp() {
    let len = this.tpNoo;
    let message;
    let crt = true;

    for (let i = 0; i < len; i++) {
      if (this.priceArray[i].p == 0) {
        message = `Invalid Price for ${this.priceArray[i].p.toFixed(2)} TP`;
        crt = false;
        break;
      }

      if (this.amountArray[i].a === 0) {
        message = `Invalid Qty for ${this.amountArray[i].a.toFixed(2)} TP`;
        crt = false;
        break;
      }
      if (this.priceArray[i].p !== null && this.amountArray[i].a === null) {
        message = `Required Quantity for ${this.priceArray[i].p.toFixed(
          2
        )} Price`;
        crt = false;
        break;
      }
      if (this.priceArray[i].p === null && this.amountArray[i].a !== null) {
        message = `Required Price For ${this.amountArray[i].a.toFixed(
          2
        )} Amount`;
        crt = false;
        break;
      }
    }
    if (!crt) {
      return [false, message];
    }
    if (this.tPForm.orderType === '') {
      return [false, 'choose Type of Order TP'];
    }
    return [true, ''];
  }
  validateSlx() {
    if (this.slXForm.slxtype == 'TP' && this.slXForm.activation == null) {
      return [false, 'Selecet Any TP for to Activate SLX'];
    }
    if (this.slXForm.slXOrderType === '') {
      return [false, 'choose Type of Order SLX'];
    }
    if (
      this.slXForm.slxtype == 'price' &&
      this.slXForm.profitpercentage == null
    ) {
      return [
        false,
        'Enter a Profit Percentage for SLX when SLX type is by trigger price',
      ];
    }
    return [true, ''];
  }

  validatePropanel() {
    if (this.getType() == 'linear' && this.isProMode) {
      this.getSl();
      if (this.slEnabled) {
        if (this.stopLossPrice != 0) {
          return [true, ''];
        } else {
          return [false, 'Invalid Stop Loss Price'];
        }
      }

      this.getTp();
      if (this.tpEnabled) {
        const check = this.validateTp();
        if (check[0]) {
          return [true, ''];
        } else {
          return [false, check[1]];
        }
      }

      this.getSlx();
      if (this.slxEnabled) {
        var check = this.validateSlx();
        if (check[0]) {
          return [true, ''];
        } else {
          return [false, check[1]];
        }
      }
      return [true, ''];
    } else {
      return [true, ''];
    }
  }
  placeTpTrade(
    orderId: string,
    orderqty: string,
    side: string,
    symbol: string,
    price: string
  ) {
    if (this.tpEnabled) {
      this.tPForms = [];
      for (let i = 0; i < this.tpNoo; i++) {
        const tpprice = this.priceArray[i].p;
        const qty = this.amountArray[i].a;
        const newTPForm = { price: tpprice, qty: qty };
        this.tPForms.push(newTPForm);
      }
      const transformedTPForm = {
        price: this.tPForms.map((form) => form.price),
        qty: this.tPForms.map((form) => form.qty),
        orderType: this.tPForm.orderType,
        orderTigger: this.tPForm.orderTigger,
        orderqty: orderqty,
        side: this.type,
        symbol: symbol,
        triggerprice: this.tPForm.triggerprice,
        category: 'linear',
        orderId: orderId,
        coinone: this.coinone,
        cointwo: this.cointwo,
        entryprice: price,
        rearrange: this.tPForm.rearrange,
      };
      console.log(transformedTPForm);
      this.profile.takeProfit(transformedTPForm).subscribe(
        (data) => this.handletakeprofitresult(data),
        (error) => {
          this.handleError(error);
        }
      );
    }
  }
  placeSlxTrade(
    orderId: string,
    size: string,
    side: string,
    symbol: string,
    entryprice: string
  ) {
    if (this.slxEnabled) {
      if (this.slXForm.slxtype == 'TP') {
        this.profile.updateSlxTp(this.slXForm).subscribe(
          (data: any) => {
            if (data.success) {
              this.toastr.success(data.message);
            } else {
              this.toastr.error(data.message);
            }
          },
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        var data = {
          profitpercentage: this.slXForm.profitpercentage,
          offset: this.slXForm.offset,
          trailingpercentage: this.slXForm.trailingpercentage,
          trailoffset: this.slXForm.trailoffset,
          trailstep: this.slXForm.trailStep,
          minimumpositonVolume: this.slXForm.minvalue,
          positionprice: entryprice,
          side: side,
          coinone: this.coinone,
          cointwo: this.cointwo,
          size: size,
          symbol: symbol,
          tradeId: orderId,
        };
        this.profile.updateSLXPrice(data).subscribe(
          (data: any) => {
            if (data.success) {
              this.toastr.success(data.message);
            } else {
              this.toastr.error(data.message);
            }
          },
          (error: any) => {
            this.handleError(error);
          }
        );
      }
    }
  }

  handletakeprofitresult(data: any) {}
  slordertigger: string = 'LastPrice';
  onOrderTiggerChange(event: any) {
    this.slordertigger = event.value;
  }
  tradeInit() {
    this.loading.show();
    this.showOrder = false;
    this.isDisabled = true;
  }
  //trade panel
  getDecimalPlaces(): number {
    const stepSizeStr = this.qtyStep.toString();
    const decimalIndex = stepSizeStr.indexOf('.');
    return decimalIndex === -1 ? 0 : stepSizeStr.length - decimalIndex - 1;
  }

  restrictDecimalforqty(event: KeyboardEvent) {
    const decimalPlaces =
      this.selectedTradeType == 'spot' ? this.basedecimal : this.decimal;
    const inputValue = (event.target as HTMLInputElement).value;
    const hasDecimal = inputValue.includes('.');

    if (this.maxQty <= this.parseFloat(inputValue)) {
      event.preventDefault();
      return;
    }
    if (hasDecimal && event.key == '.') {
      event.preventDefault();
      return;
    }
    if (this.qtyStep == 1 && event.key == '.') {
      event.preventDefault();
      return;
    }
    if (hasDecimal) {
      const decimalCount = inputValue.split('.')[1]?.length || 0;
      if (decimalCount >= decimalPlaces) {
        event.preventDefault();
      }
    }
    const isNumberKey = event.key >= '0' && event.key <= '9';
    if (!isNumberKey && event.key !== '.') {
      event.preventDefault();
    }
  }

  inputRegex(event: KeyboardEvent) {
    const isNumberKey = event.key >= '0' && event.key <= '9';
    if (!isNumberKey && event.key !== '.') {
      event.preventDefault();
    }
  }

  validateTradePanel() {
    let isValid = true;
    this.qtyerror = !this.qty;
    this.priceerror = this.showprice && !this.price;
    this.triggerpriceerror = this.showtriggerprice && !this.triggerprice;
    isValid = !(this.qtyerror || this.priceerror || this.triggerpriceerror);
    return isValid;
  }

  placeTrade() {
    if (this.validateTradePanel()) {
      const checkEnabledPanel = this.validatePropanel();
      if (checkEnabledPanel[0]) {
        this.tradeInit();
        const request: any = {
          price: this.price,
          triggerPrice: this.triggerprice,
          qty: this.qty,
          side: this.type,
          category: localStorage.getItem('type') || 'spot',
          symbol: this.symbol,
          coinone: this.coinone,
          cointwo: this.cointwo,
          orderType: this.selectedOrderType,
          timeInForce: this.tif,
          reduceonly: this.reduceOnly,
          postonly: this.postOnly,
        };
        if (this.slEnabled) {
          request.stoplossprice = this.stopLossPrice;
          request.sltrigger = this.slordertigger;
        }

        this.profile.trade(request).subscribe(
          (data) => {
            this.handlepostradesuccess(data);
          },
          (error) => this.handleError(error)
        );
      } else {
        const message = checkEnabledPanel[1];
        if (typeof message === 'string' && message) {
          this.toastr.error(message);
        }
      }
    }
  }

  cancelOrder(id: number) {
    this.loading.show();
    this.isDisabled = true;
    var type = localStorage.getItem('type');
    this.profile.cancelOrder(id, type).subscribe(
      (data) => this.handlecanceltradesuccess(data),
      (error) => this.handleError(error)
    );
  }

  handlepostradesuccess(data: any) {
    this.updatecurrentbalance();
    this.loading.hide();
    this.isDisabled = false;

    if (data.success) {
      this.qty = null;
      this.value = null;

      var orderId = data.result.orderID;
      var qty = data.result.qty;
      var side = data.result.side;
      var symbol = data.result.symbol;
      var price = data.result.price;

      if (this.getType() == 'linear' && this.isProMode) {
        this.placeTpTrade(orderId, qty, side, symbol, price);
        this.placeSlxTrade(orderId, qty, side, symbol, price);
      }
      this.updateHistoryPanel();
      this.loading.hide();
      this.error = null;
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  }
  handlepositionlistsuccess(data: any) {
    if (data.success) {
      this.positionTrades = data.result.result.list;
      let symbol = this.symbol.split('_').join('');
      for (let i = 0; i < this.positionTrades.length; i++) {
        if (this.positionTrades[i].symbol == symbol) {
          this.positionSingleList = this.positionTrades[i];
        }
      }
    } else {
      this.handleError(data.message);
    }
  }
  handleopenordersuccess(data: any) {
    let res = data.result;
    if (data.success) {
      this.openorders = res;
    } else {
      this.handleError(data.message);
    }
  }
  handleclosedtradessuccess(data: any) {
    let type = localStorage.getItem('type');
    let res = data.result;
    const trades = [];
    if (data.success) {
      if (type == 'spot') {
        this.closedtrades = res;
      }
      if (type == 'linear') {
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderStatus === 'Filled') {
            trades.push(res[i]);
          }
        }
        this.positionCloseTrades = trades;
      }
    } else {
      this.handleError(data.message);
    }
  }
  handlecanceltradesuccess(data: any) {
    this.loading.hide();
    this.isDisabled = false;

    if (data.success) {
      this.updateHistoryPanel();
      this.loading.hide();
      this.error = null;
      this.updatecurrentbalance();
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  }
  changeLeveloff(selectedValue: any) {}

  sendCoinToWallet(coin: string, type: string) {
    this.router.navigate(['/app/wallets']);
    this.walletCommunicationService.sendCoinData(coin, type);
  }
  generateDivs(): void {
    this.divArray = Array.from({ length: this.tpNoo });
    this.priceArray = [];
    this.amountArray = [];
    this.activation = [];

    var price = this.tPForm.price;
    var amount = this.tPForm.qty;
    var amount = 100;

    if (price == 0) {
      for (let i = 0; i < this.tpNoo; i++) {
        this.priceArray.push({ p: 0, c: 100 });
        this.amountArray.push({ a: 0, pc: 100 });
      }
    } else {
      const priceper = (100 / this.tpNoo).toFixed(2);
      const Dividedamount = (amount / this.tpNoo).toFixed(2);
      for (let i = 0; i < this.tpNoo; i++) {
        this.priceArray.push({ p: price, c: 100 });
        this.amountArray.push({ a: parseFloat(Dividedamount), pc: 100 });
      }
    }

    for (let i = 0; i < this.tpNoo; i++) {
      this.activation.push({ label: `TP ${i + 1}`, value: i + 1 });
    }
  }
  setFav(symbol: string): void {
    if (this.favoriteItems.has(symbol)) {
      this.favoriteItems.delete(symbol);
    } else {
      this.favoriteItems.add(symbol);
    }
    const data = {
      pair: Array.from(this.favoriteItems),
    };
    this.profile.storefav(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.toastr.success('Favorites updated successfully');
        } else {
          this.toastr.error('Failed to update favorites');
        }
      },
      (error) => {
        console.error('Error while updating favorites:', error);
      }
    );
    localStorage.setItem('fav', JSON.stringify(Array.from(this.favoriteItems)));
  }
  //Tp form price percentage cal
  calpriceTP(event: any, i: number) {
    let livePrice = this.tPForm.price ? this.tPForm.price : 0;
    const percentage = parseFloat(event.target.value);
    if (isNaN(percentage)) {
      this.priceArray[i].p = livePrice;
      return;
    }
    const priceDifference = livePrice * (percentage / 100);
    const newPrice = livePrice + priceDifference;
    this.priceArray[i].p = newPrice;
  }
  calpercentageTP(event: any, i: number) {
    let Liveprice = this.tPForm.price ? this.tPForm.price : 0;
    const price = event.target.value;
    const percentageDifference = ((price - Liveprice) / Liveprice) * 100;
    if (isNaN(percentageDifference)) {
      this.priceArray[i].c = 0.0;
    } else {
      this.priceArray[i].c = parseFloat(percentageDifference.toFixed(2));
    }
  }
  getQtyPrice() {
    this.generateDivs();
  }
  updateTpdata(qty: any, price: any) {
    this.tPForm.qty = qty;
    this.tPForm.price = price;
  }
  private ws: WebSocket | undefined;

  // initializeWebSocket() {
  //   this.ws = new WebSocket('wss://stream.bybit.com/v5/private');
  //   this.ws.onopen = () => {
  //     this.authenticateAndSubscribe();
  //   };

  //   this.ws.onmessage = this.handleWebSocketMessage.bind(this);
  //   this.ws.onerror = (error: any) => {
  //     console.error('WebSocket error:', error);
  //   };
  //   this.ws.onclose = () => {
  //     console.log('WebSocket connection closed.');
  //   };
  // }
  // authenticateAndSubscribe() {
  //   if (this.ws) {
  //     const timestamp = Date.now() + 300000;
  //     const apiKey = 'xC4P0edCyl6Jd965cv';
  //     const apiSecret = 'DkJtelyiL7MjIPj9yVSgLPia8g9rXA946X7s';
  //     const signature = this.generateSignature(apiKey, apiSecret, timestamp);
  //     const authMessage = {
  //       op: 'auth',
  //       args: [apiKey, timestamp, signature],
  //     };
  //     this.ws.send(JSON.stringify(authMessage));
  //     const subscribeMessage = {
  //       op: 'subscribe',
  //       args: ['order'],
  //     };
  //     this.ws.send(JSON.stringify(subscribeMessage));
  //   } else {
  //     console.error('WebSocket is not initialized.');
  //   }
  // }
  // private generateSignature(
  //   apiKey: string,
  //   apiSecret: string,
  //   timestamp: number
  // ): string {
  //   const params = `${apiKey}${timestamp}`;
  //   const hash = CryptoJS.HmacSHA256(params, apiSecret);
  //   return CryptoJS.enc.Hex.stringify(hash);
  // }

  // handleWebSocketMessage(event: MessageEvent) {
  //   const data = JSON.parse(event.data);
  //   console.log(data);
  //   if (data && data.topic && data.topic.startsWith('order.')) {
  //     this.updateOpenOrders(data.data);
  //   }
  // }
  updateOpenOrders(newOrders: any) {
    this.openorders = newOrders;
  }
  //Balance in Metamask Wallet
  async metaBalance(address: string) {
    this.web3 = new Web3(window.ethereum);
    const balanceWei = await this.web3.eth.getBalance(address);
    const balanceEther = this.web3.utils.fromWei(balanceWei, 'ether');
  }
  metaMFormSubmit() {
    if (this.metaMForm.valid) {
    } else {
      Object.values(this.metaMForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  //Send Amount User Wallet to Client wallet Metamask
  async transfer(fromAddress: string, toAddress: string, amount: number) {
    this.web3 = new Web3(window.ethereum);
    const amountWei = this.web3.utils.toWei(amount.toString(), 'ether');
    try {
      const txHash = await this.web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amountWei,
      });
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }
}
function viewChild(
  arg0: string
): (target: SubmainpanelComponent, propertyKey: 'tab2') => void {
  throw new Error('Function not implemented.');
}
