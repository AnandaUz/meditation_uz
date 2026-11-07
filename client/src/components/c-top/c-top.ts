import "./c-top.scss";

export class CTop extends HTMLElement {
  async connectedCallback() {
    const isHome = window.location.pathname === "/";
    this.innerHTML = `
    <div class="top">
      <img src="/photo-ananda2.jpg" alt="Медитация в Ташкенте — ведущий коллективных практик Ананда" fetchpriority="high" loading="eager">      
      <div class="b00">
    <!--  
          Саморазвитие • Здоровье • Бизнес
          -->
      </div>
        

      <div class="b02">
        <a href="/" class="home_anh">
            ${isHome ? "" : '<span class="home"></span>'}
            <span class="name">МЕДИТАЦИЯ <span class="city">В ТАШКЕНТЕ</span></span>
        </a>
      </div>
      
  </div>
    
    `;
  }
}

customElements.define("c-top", CTop);
