import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  @ViewChild('chartComponent') chartComponent: ElementRef | undefined;
  commonOptions: any[] = [];
  basicOptions: any;
  lineStylesData: any;
  value1: any;
  value2: any;
  public chart: any;
  tableData: any = [];
  summury: any = [];
  // config: AppConfig;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.commonOptions = [
      { name: 'Sample', code: 'NY' },
      { name: 'Sample', code: 'RM' },
      { name: 'Sample', code: 'LDN' },
      { name: 'Sample', code: 'IST' },
      { name: 'Sample', code: 'PRS' },
    ];

    this.basicOptions = {
      bezierCurve: false,
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#ebedef',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
            fontSize: 40,
            font: {
              family: 'Euclid Circular A', // Your font family
              size: 14,
            },
            fontFamily: 'Euclid Circular A',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
            fontSize: 40,
            font: {
              family: 'Euclid Circular A', // Your font family
              size: 14,
            },
            fontFamily: 'Euclid Circular A',
            callback: (label: string, index: any, labels: any) => {
              return '$' + label + ' ' + 'T';
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      },
    };

    this.lineStylesData = {
      labels: [
        'Sep’21',
        'Oct’21',
        'Nov’21',
        'Dec’21',
        'Jan’22',
        'Feb’22',
        'Mar’22',
        'Apr’22',
        'Mar’22',
        'May’22',
        'Jun’22',
        'Jul’22',
        'Aug’22',
      ],

      datasets: [
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
          fill: true,
          borderColor: '#3C71FB',
          tension: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointRadius: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
    // this.createChart(ctx);

    this.tableData = [
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        samount: '$20',

      },
    ];

    this.summury = [
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },{
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',

      },
    ];
  }

  onClickAction(){
    this.router.navigate(['/dashboard/account-summury'])
 }

  createChart() {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgb(60, 113, 251, 0.2)');
    gradient.addColorStop(1, 'rgba(85, 110, 173, 0)');

    this.chart = new Chart('MyChart6', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Sep’21',
          'Oct’21',
          'Nov’21',
          'Dec’21',
          'Jan’22',
          'Feb’22',
          'Mar’22',
          'Apr’22',
          'Mar’22',
          'May’22',
          'Jun’22',
          'Jul’22',
          'Aug’22',
        ],
        datasets: [
          {
            data: [60, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
            borderColor: '#3C71FB',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 16.1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ebedef',
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
          y: {
            ticks: {
              stepSize: 40,
              color: '#ebedef',
              // fontSize: 40,
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
              callback: function (val, index) {
                return '$' + val + ' ' + 'T';
              },
            },
            grid: {
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });
  }

  ngAfterViewInit(): void {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas.getContext('2d');
    console.log(ctx);

    this.createChart();
  }

  // getGradient(ctx: any) {
  //   // let canvas = document?.getElementById('chart');
  //   var gradient = ctx.createLinearGradient(0, 0, 0, 300);
  //   gradient.addColorStop(0, 'rgba(224, 195, 155, 1)');
  //   gradient.addColorStop(1, 'rgba(100, 100, 0,0)');
  //   console.log(gradient);
  //   return gradient;
  // }
}