import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Command} from "../models/command";

@Injectable()
export class CommandsService {

  constructor(private http: HttpClient) {
  }

  index(): Observable<Command[]> {
    return this.http
      .get<Command[]>(`${environment.appApi.baseUrl}/commands`);
  }

  show(commandId: number): Observable<Command> {
    return this.http
      .get<Command>(`${environment.appApi.baseUrl}/commands/${commandId}`);

  }

  create(command: Command): Observable<Command> {
    return this.http.post<Command>(`${environment.appApi.baseUrl}/commands`, command);
  }

  update(command: Command): Observable<Command> {
    return this.http.patch<Command>(`${environment.appApi.baseUrl}/commands/${command.id}`, command);
  }

  destroy(id: number): Observable<Command> {
    return this.http.delete<Command>(`${environment.appApi.baseUrl}/commands/${id}`);
  }
}
