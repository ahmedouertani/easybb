import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, of, Subject, observable, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class datasetService {
  private subject = new BehaviorSubject<string>('reload');
  castReload = this.subject.asObservable();

  private httpClient: HttpClient;
  constructor(private http: HttpClient, private handler: HttpBackend) {

    this.httpClient = new HttpClient(handler);
  }
  //datasetId
  getDatasetList() {
    return this.http.get(environment.apiUrl + '/list_dataset/' + 'testowner1')
      .pipe(catchError((err) => of(err)))

  }
  //tableId,projectId,datasetId
  getSchemeByTable() {
    return this.http.get(environment.apiUrl + '/get_schema/' + 'testowner1' + '/' + 'string' + '/' + 'eee')
      .pipe(catchError((err) => of(err)))

  }

  //tableId,projectId,datasetId
  getTableSize() {
    return this.http.get(environment.apiUrl + '/table_size/' + 'testowner1' + '/' + 'string' + '/' + 'eee')
      .pipe(catchError((err) => of(err)))
  }
  //projectId,datasetId,tableId
  getTableContent() {
    this.http.get(environment.apiUrl + '/get_table_content/' + 'testowner1' + '/' + 'string' + '/' + 'eee')
      .pipe(catchError((err) => of(err)))

  }

  sendDatasetName(name) {
    this.subject.next(name);
  }

  recieveName(): Observable<string> {
    return this.subject.asObservable();
  }


  createFolder(domaineId, folderName) {
    return this.http.post(environment.apiUrl + '/create_folder/' + domaineId, folderName)
      .pipe(catchError((err) => of(err)))
  }

  getListeFolders(domaineId) {
    return this.http.get(environment.apiUrl + '/list_folders/' + domaineId)
      .pipe(catchError((err) => of(err)))
  }

  getTablesByFolder(domaineId, folderId) {
    return this.http.get(environment.apiUrl + '/get_tables/' + domaineId + '/' + folderId)
      .pipe(catchError((err) => of(err)))

  }

  deleteFolder(domaineId, folderId) {
    return this.http.delete(environment.apiUrl + '/delete_folder/' + domaineId + '/' + folderId)
      .pipe(catchError((err) => of(err)))

  }

  updateFolder(domaineId, folderId, data) {
    return this.http.put(environment.apiUrl + '/update_folder/' + domaineId + '/' + folderId, data)
      .pipe(catchError((err) => of(err)))
  }


  getscheme(domaineId, folderId, tableId) {
    return this.http.get(environment.apiUrl + '/get_schema/' + domaineId + '/' + folderId + '/' + tableId)
      .pipe(catchError((err) => of(err)))

  }

  getOverview(domaineId, folderId, tableId) {
    return this.http.get(environment.apiUrl + '/get_table_content/' + domaineId + '/' + folderId + '/' + tableId)
      .pipe(catchError((err) => of(err)))
  }

  createTableName(domaineId, folderId, data) {
    return this.http.post(environment.apiUrl + '/create_table/' + domaineId + '/' + folderId, data)
      .pipe(catchError((err) => of(err)))
  }

  createFile(domaineId, folderId, tableId, data: FormData) {
    console.log(data);

    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Type', 'multipart/form-data; boundary=<calculated when request is sent>');
    //headers.append('Content-Type', 'multipart/form-data; boundary=<calculated when request is sent>');
    headers.append('Content-Type', 'text/csv');


    return this.http.post(environment.apiUrl + '/upload_file/'
      + domaineId + '/' + folderId + '/' + tableId, data)

  }

  powst(domaineId, folderId, uploadedFile: FormData,tableId?): Observable<any> {
    let token: any = getAuth().currentUser;
    let accessToken = token.accessToken

    // let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        // 'Content-Type':undefined
      })
    };
    console.log(uploadedFile);

    httpOptions.headers.delete("Content-Type");
    // httpHeaders.append('Content-Type', 'text/csv');
    // headers.append('Authorization',`Bearer ${auth.token}`);
    // headers.append('enctype', 'multipart/form-data');
    // httpHeaders.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', '*/*');
    // 'Content-Type', 'text/csv'
    // headers.append('enctype', 'multipart/form-data');
    return this.httpClient.post(`${environment.apiUrl}/upload_table_file/` + domaineId + '/' + folderId , uploadedFile,
      httpOptions)
  }
  uploadFile(domaineId, folderId, uploadedFile: FormData,tableId): Observable<any> {
    let token: any = getAuth().currentUser;
    let accessToken = token.accessToken

    // let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        // 'Content-Type':undefined
      })
    };
    console.log(uploadedFile);

    httpOptions.headers.delete("Content-Type");
    // httpHeaders.append('Content-Type', 'text/csv');
    // headers.append('Authorization',`Bearer ${auth.token}`);
    // headers.append('enctype', 'multipart/form-data');
    // httpHeaders.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', '*/*');
    // 'Content-Type', 'text/csv'
    // headers.append('enctype', 'multipart/form-data');
    return this.httpClient.post(`${environment.apiUrl}/upload_file/` + domaineId + '/' + folderId + '/' + tableId , uploadedFile,
      httpOptions)
  }

  editReload(reload) {
    this.subject.next(reload);
  }

  deleteAll(domaineId) {
    return this.http.delete(environment.apiUrl + '/delete_all_folder/' + domaineId)
      .pipe(catchError((err) => of(err)))
  }


  deleteTable(domaineId, folderId, tableId) {
    return this.http.delete(environment.apiUrl + '/delete_table/' + domaineId + '/' + folderId + '/' + tableId)
      .pipe(catchError((err) => of(err)))
  }

  getFilesList(domaineId, folderId) {
    return this.http.get(environment.apiUrl + '/get_files/' + domaineId + '/' + folderId)
      .pipe(catchError((err) => of(err)))
  }


  accountService(domaineId, data: FormData): Observable<any> {

    let token: any = getAuth().currentUser;
    let accessToken = token.accessToken

    // let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        // 'Content-Type':undefined
      })
    };
    httpOptions.headers.delete("Content-Type");


    return this.httpClient.post(environment.apiUrl + '/upload_account_service/'
      + domaineId + '/' , data,httpOptions)

  }

}
