import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface IToast {
  text: string;
  type: "error" | "info" | "warning";
}

export class Toaster extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property()
  toasts: IToast[] = [];

  connectedCallback(): void {
    console.log("connected");
    document.addEventListener("htmx:responseError", (e: any) => {
      const text = e.detail.xhr.response;
      const toast: IToast = { text, type: "error" };
      this.toasts.push(toast);
    });
  }

  toastTemplate(toast: IToast) {
    return html`<div class="toast toast__${toast.type}">${toast.text}</div>`;
  }

  render() {
    return html`<div id="toaster">
  ${this.toasts.map((t) => this.toastTemplate({ text: t.text, type: t.type }))} 
      ToasterRoot
    </div>`;
  }
}

customElements.define("my-toaster", Toaster);
