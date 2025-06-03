import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from '../modelos/cliente'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient)
  private api = `http://localhost:3000/clientes`

  constructor() { }


   getAll(){
    return this.http.get<Cliente[]>(`${this.api}`)
  }

   login(cliente:Partial<Cliente>){
    return this.http.get<Cliente>(`${this.api}/login/${cliente.email}/${cliente.senha}`)
  }

   getById(id:number){
    return this.http.get<Cliente>(`${this.api}/id/${id}`)
  }

   getByName(nome:string){
    return this.http.get<Cliente[]>(`${this.api}/${nome}`)
  }

   cadastrar(cliente:Partial<Cliente>){
    return this.http.post<Cliente>(this.api, cliente)
  }

   delete(id:number){
    return this.http.delete(`${this.api}/delete/${id}`)
  }

   update(cliente:Partial<Cliente>, id:number){
    return this.http.put<Cliente>(`${this.api}/${id}`, cliente)
  }
}
