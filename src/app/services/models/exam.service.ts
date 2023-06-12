import { Injectable } from '@angular/core';
import { Create_Exam } from 'src/app/contracts/create_exam';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Exam } from 'src/app/contracts/list_exam';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../common/http-client.service';
import { Update_Exam } from 'src/app/contracts/update_exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Exam, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({ 
      controller: "exams",
      action: "createExam"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  update(product: Update_Exam, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.put({ 
      controller: "exams",
      action: "updateExam"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage) => void): Promise<{ totalCount: number; exams: List_Exam[] }> {
    const promiseData: Promise<{ totalCount: number; exams: List_Exam[] }> = this.httpClientService.get<{ totalCount: number; exams: List_Exam[] }>({
      controller: "exams",
      action: "exams",
      queryString: `page=${page}&size${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

 async delete(id: string){
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: "exams",
      action: "delete" 
    }, id)

    await firstValueFrom(deleteObservable);
  }

}



