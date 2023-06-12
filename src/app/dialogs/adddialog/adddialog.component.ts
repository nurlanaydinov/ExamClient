import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from 'src/app/services/models/exam.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Exam } from 'src/app/contracts/create_exam';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/exam/alertify.service';
import { Update_Exam } from 'src/app/contracts/update_exam';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.scss']
})
export class AdddialogComponent extends BaseDialog<AdddialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<AdddialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private examService: ExamService,
    private alertify: AlertifyService,
    private router: Router) {
    super(dialogRef)
  }
  @Output() createdExam: EventEmitter<Create_Exam> = new EventEmitter();
  date1: any;
  create_exam: Create_Exam = new Create_Exam();
  update_exam: Update_Exam = new Update_Exam();
  id: string;
  crudBtn: string;
  dialogTitle: string;
  lessonCode: string = "";
  studentNumber: number;
  dt: Date;
  rating: number;

  ngOnInit(): void {
    if (this.data == 0) {
      this.create_exam = new Create_Exam();
      this.crudBtn = "Yadda saxla";
      this.dialogTitle = "Create Exam";
    } else {
      this.create_exam = new Update_Exam();
      this.create_exam = this.data;
      this.crudBtn = "Yadda saxla";
      this.dialogTitle = "Update Exam";
      this.id = this.create_exam.id;
      this.studentNumber = this.create_exam.studentNumber;
      this.lessonCode = this.create_exam.lessonCode;
      this.dt = this.create_exam.examDate;
      this.rating = this.create_exam.rating;
    }

  }
  click(e: any) {
    this.dt = e.value;   
  }

  crud(lessonCode: HTMLInputElement, studentNumber: HTMLInputElement, rating: HTMLInputElement) {
    if (this.data == 0) {
      this.spinner.show(SpinnerType.BallAtom);
      this.create_exam.lessonCode = lessonCode.value;
      this.create_exam.studentNumber = parseInt(studentNumber.value);
      this.create_exam.rating = parseInt(rating.value);
      this.dt.setDate(this.dt.getDate()+ 1);
      this.create_exam.examDate = new Date(this.dt);   
      this.examService.create(this.create_exam, () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertify.message("Product successfully added!",
          {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        this.createdExam.emit(this.create_exam);
        $("#btnClose").click(); 
      }, errorMessage => {
        this.alertify.message(errorMessage,
          {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
      });
    }
    else {
      this.update_exam = new Update_Exam();
      this.spinner.show(SpinnerType.BallAtom);
      this.update_exam.id = this.id;
      this.update_exam.lessonCode = lessonCode.value;
      this.update_exam.studentNumber = parseInt(studentNumber.value);
      this.update_exam.rating = parseInt(rating.value);
      this.dt = new Date(this.dt);
      this.dt.setDate(this.dt.getDate()+ 1);
      this.update_exam.examDate = this.dt;
      this.examService.update(this.update_exam, () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertify.message("Product successfully Updated!",
          {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        this.createdExam.emit(this.create_exam);
        $("#btnClose").click(); 
            
      }, errorMessage => {
        this.alertify.message(errorMessage,
          {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
      });
    }
  }


}


