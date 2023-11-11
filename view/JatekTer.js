export default class JatekTer {

    static instance;
    #meret;
    #szuloElem;
    #jatekElem;
    #eredmenyElem;

    constructor(meret, szuloElem) {
        if (!JatekTer.instance) {
            JatekTer.instance = this;
        }
        this.#meret = meret;
        this.#szuloElem = szuloElem;
        this.#szuloElem.html('<div class="panel"><button class="uj">Új játék</button></div><div class="jatek"></div><div class="eredmeny"></div>');
        this.#szuloElem.find("button.uj").on("click", (event) => this.#ujJatekTrigger());
        this.#eredmenyElem = this.#szuloElem.children("div.eredmeny");
        this.#jatekElem = this.#szuloElem.children("div.jatek");
    }

    kirajzol() {
        this.#jatekElem.html("");
        for (let i = 0; i < this.#meret ** 2; i++) {
            this.#jatekElem.append(`<div class="lampa kikapcsolt"></div>`); // ${i}
            this.#jatekElem.children("div:last-child").on("click", (details) => {
                let index = $(details.target).index();
                this.#kattingasTrigger(details, index);
            });
        }
        return this;
    }

    frissit(id, allapot) {
        if (allapot) {
            this.#jatekElem.children("div.lampa").eq(id).addClass('bekapcsolt').removeClass('kikapcsolt')
        } else {
            this.#jatekElem.children("div.lampa").eq(id).addClass('kikapcsolt').removeClass('bekapcsolt')
        }
    }

    eredmeny(szoveg) {
        this.#eredmenyElem.html(szoveg);
    }

    #ujJatekTrigger() {
        window.dispatchEvent(new CustomEvent("ujjatek", { }));
    }

    #kattingasTrigger(details, index) {
        window.dispatchEvent(new CustomEvent("kapcsolas", { detail: details, index: index }));
    }
}
