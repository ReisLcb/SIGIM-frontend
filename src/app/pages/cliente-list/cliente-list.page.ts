import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonSelect, IonSelectOption, IonIcon, IonButtons} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { Cliente } from 'src/app/modelos/cliente';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,CommonModule, FormsModule, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonSelect, IonSelectOption, IonIcon]
})
export class ClienteListPage {

  private clienteService = inject(ClienteService);
  private router = inject(Router)

  public clientes: Cliente[] = []

  constructor(private toastController: ToastController) {
    this.obterTodos()
 
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
        },
        error: (erro) => {
          console.log(erro.error.error);
          this.clientes = []
        },
      });
    } else this.obterTodos()
   
  }

   protected pesquisarPeloId(evento: Event) {
    const input = evento.target as HTMLIonInputElement;

    console.log(input.value);

    if (input.value) {
      this.clienteService.getById(Number(input.value)).subscribe({
        next: (cliente) => {
          this.clientes = [];
          this.clientes.push(cliente)
        },
        error: (erro) => {
          console.log(erro.error.error);
          this.clientes = []
        },
      });
    } else this.obterTodos()
   
  }

  protected obterTodos() {
    this.clienteService.getAll().subscribe({
      next: (users) => {
        this.clientes = users
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
  }

  protected alterar(index: number) {
    const clienteSelecionado = this.clientes[index]

    this.router.navigate(
      ['/cadastro'], 
      { state: clienteSelecionado }
  )}

  protected excluir(id: number) {
    this.clienteService.delete(id).subscribe({
      next: () => {
        this.exibirMensagem("Cliente excluído com sucesso")
        this.obterTodos()
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
  }
    protected cadastrar() {
    this.router.navigate(['/aluno-create'])
  }

}
