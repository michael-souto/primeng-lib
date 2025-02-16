import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { Message } from "projects/design-lib/src/lib/models/message.model";

@Component({
  selector: "d-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  private closeFunction: () => void = () => {};
  private confirmFunction?: () => void; // Permite undefined para condicionar o botão
  public hasConfirmFunction: boolean = false; // Controla a exibição do botão

  constructor(private messageService: MessageService) {}

  /**
   * Sobrecarga 1: Exibe mensagens com funções de confirmação e fechamento personalizadas.
   * @param message Lista de mensagens.
   * @param closeFunction Função chamada ao fechar.
   * @param confirmFunction Função chamada ao confirmar.
   */
  showMessages(message: Message[], closeFunction: () => void, confirmFunction: () => void): void;

  /**
   * Sobrecarga 2: Exibe mensagens sem funções personalizadas.
   * @param message Lista de mensagens.
   */
  showMessages(message: Message[]): void;

  /**
   * Implementação do método showMessages que decide qual lógica usar dependendo dos parâmetros.
   */
  showMessages(message: Message[], closeFunction?: () => void, confirmFunction?: () => void): void {
    // Define funções de confirmação e fechamento apenas se forem passadas
    this.closeFunction = closeFunction || (() => {});
    this.confirmFunction = confirmFunction; // Pode ser undefined
    this.hasConfirmFunction = !!confirmFunction; // Define se o botão deve aparecer
    this.messageService.clear();
    message.forEach((m) => {
      this.messageService.add({
        severity: m.type,
        detail: m.description,
      });
    });
  }

  onConfirm() {
    if (this.confirmFunction) {
      this.confirmFunction();
    }
  }

  onReject() {
    if (this.closeFunction) {
      this.closeFunction();
    }
  }
}
