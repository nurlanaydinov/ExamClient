import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Exam } from 'src/app/contracts/list_exam';
import { AlertifyService, MessageType, Position } from 'src/app/services/exam/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ExamService } from 'src/app/services/models/exam.service';
import { Create_Exam } from 'src/app/contracts/create_exam';
import { AdddialogComponent } from 'src/app/dialogs/adddialog/adddialog.component';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private examService: ExamService,
    private alertify: AlertifyService,
    private dialogService: DialogService) {
    super(spinner);
  }
  crud_exam: Create_Exam;
  displayedColumns: string[] = ['lessonCode', 'studentNumber', 'examDate', 'rating', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Exam> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getExams();
  }

  async getExams() {
    this.showSpinner(SpinnerType.BallAtom);
    const allExams: { totalCount: number, exams: List_Exam[] } = await this.examService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ?
      this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }))
    this.dataSource = new MatTableDataSource<List_Exam>(allExams.exams);
    this.paginator.length = allExams.totalCount;
  }

  async pageChanged() {
    await this.getExams();
  }
  
  addData(id: string){
    this.dialogService.openDialog({
      componentType: AdddialogComponent,
      data: id,
      afterClosed: async () => { await this.getExams(); }
    })
   
  }
   editRow(gridData: any){
     this.dialogService.openDialog({
      componentType: AdddialogComponent,
      data: gridData,
      afterClosed: async () => { await this.getExams(); }
    })
  }  
}



