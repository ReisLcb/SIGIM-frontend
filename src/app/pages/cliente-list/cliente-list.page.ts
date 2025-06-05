import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { Cliente } from 'src/app/modelos/cliente';
import { formatarData, tratarCpf, tratarTelefone } from '../../modelos/funcoes'

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar]
})
export class ClienteListPage {

  private clienteService = inject(ClienteService);
  private router = inject(Router)

  public clientes: Cliente[] = []

  constructor(private toastController: ToastController) {
    this.obterTodos()
  }

  async formatarDados() {
    this.clientes.forEach((cliente) => {
      cliente.cpf = tratarCpf(cliente.cpf.toString())
      cliente.telefone = tratarTelefone(cliente.telefone.toString())
      cliente.data_nascimento = formatarData(cliente.data_nascimento.toString())
    })
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected pesquisarPeloNome(evento: Event) {
    const searchBar = evento.target as HTMLIonSearchbarElement;

    console.log(searchBar.value);

    if (searchBar.value) {
      this.clienteService.getByName(searchBar.value).subscribe({
        next: (clientes) => {
          this.clientes = clientes;
          this.formatarDados()
        },
        error: (erro) => {
          console.log(erro.error.error);
          this.clientes = []
        },
      });
    } else {
      this.obterTodos()
    }
  }

  protected obterTodos() {
    this.clienteService.getAll().subscribe({
      next: (users) => {
        this.clientes = users
        this.formatarDados()
      },

      error: (erro) => this.exibirMensagem(erro.error)
    })
  }

  protected alterar(id: number) {

  }

  protected excluir(id: number) {
    this.clienteService.delete(id).subscribe({
      next: () => {
        this.exibirMensagem("Cliente excluído com sucesso")
        this.obterTodos()
      },

      error: (erro) => this.exibirMensagem(erro.error)
    })
  }

}
