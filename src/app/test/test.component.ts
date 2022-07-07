import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  name = 'Angular Html To Pdf ';
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  public openPDF(): void {
    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });
  }

  // @ViewChild('content', { static: false })
  // content!: ElementRef;


  // public downloadPDF() {
  //   // const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element: any, renderer: any) {
  //       return true;
  //     }
  //   };

  //   const content = this.content.nativeElement;
  //   console.log(content.innerHTML,"------test")

  //   // doc.fromHTML(content.innerHTML, 15, 15, {
  //   //   width: 190,
  //   //   'elementHandlers': specialElementHandlers
  //   // });

  //   // doc.html(content.innerHTML);

  //   // doc.save('test.pdf');

  //   let data = this.content.nativeElement;
  //   let options : any = {
  //     orientation: 'p',
  //     unit: 'px',
  //     format: 'a0',
  //     };
  //   let doc = new jsPDF(options);
  //    doc.html(data.innerHTML, {
  //     callback: function (doc) {
  //           doc.save("angular-demo.pdf");
  //         },
  //     margin:15,
  //     x: 10,
  //     y: 10
  //   });
  // }

  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF2(): void {
    let data = this.htmlData.nativeElement;

    let options: any = {
      orientation: 'p',
      unit: 'px',
      format: 'a0',
    };
    let doc = new jsPDF(options);
    doc.html(data.innerHTML, {
      callback: function (doc) {
        doc.output('dataurlnewwindow');
      },
      margin: 15,
      x: 10,
      y: 10
    });

  }
  public downloadPDF(): void {
    let data = this.htmlData.nativeElement;
    let options: any = {
      orientation: 'p',
      unit: 'px',
      format: 'a0',
    };
    let doc = new jsPDF(options);
    doc.html(data.innerHTML, {
      callback: function (doc) {
        doc.save("angular-demo.pdf");
      },
      margin: 15,
      x: 10,
      y: 10
    });
  }
}
