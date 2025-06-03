import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { Cliente } from 'src/app/modelos/cliente';
import { tratar_cpf, tratar_telefone } from 'tratardados/src/controller'

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class ClienteListPage {

  private clienteService = inject(ClienteService);
  private router = inject(Router)

  public clientes:Cliente[] = []

  constructor(private toastController: ToastController) {
    this.obterTodos()
  }

  async exibirMensagem(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected obterTodos(){
      this.clienteService.getAll().subscribe({
        next: (users) =>{
          this.clientes = users 

          this.clientes.forEach((cliente) =>{
            cliente.cpf = tratar_cpf(cliente.cpf.toString())
            cliente.telefone = tratar_telefone(cliente.telefone.toString().replace(" ", ""))
            cliente.data_nascimento = cliente.data_nascimento.split("T")[0]
          })
        },

        error: (erro) => this.exibirMensagem(erro.error)
      })
  }

  protected alterar(id:number){

  }

  protected excluir(id:number){
    this.clienteService.delete(id).subscribe({
      next: () => {
        this.exibirMensagem("Cliente excluído com sucesso")
        this.obterTodos()
      },

      error: (erro) => this.exibirMensagem(erro.error)
    })
  }

}
