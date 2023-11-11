import JatekTer from "../view/JatekTer.js";

export default class JatekController {

    #meret;
    #allapotLista;
    #lepesSzam;
    #jatekTer;
    #vege;

    constructor(meret, szuloElem) {
        this.#meret = meret;
        this.#jatekTer = new JatekTer(meret, szuloElem);
        this.init();

        $(window).on("kapcsolas", (event) => {
            let elem = event.detail.target;
            let index = Array.from(elem.parentNode.children).indexOf(elem);
            this.#kattintas(index);
        })

        $(window).on("ujjatek", (event) => {
            this.init();
        })
    }

    #kattintas(index) {
        if (!this.#vege) {
            this.#lepesSzam++;
            this.#allapotLista[index] = !this.#allapotLista[index];
            let szomszedok = this.szomszedokKeresese(index);

            for (const szIdx of szomszedok) {
                this.#allapotLista[szIdx] = !this.#allapotLista[szIdx];;
                this.#jatekTer.frissit(szIdx, this.#allapotLista[szIdx]);
            }

            this.#jatekTer.frissit(index, this.#allapotLista[index]);
            this.#vege = this.ellenorzes();
            if (!this.#vege) {
                this.#jatekTer.eredmeny(`${this.#lepesSzam}. lépés`)
            } else {
                this.#jatekTer.eredmeny(`A játék véget ért ${this.#lepesSzam} lépésből!`)
            }
        }
    }

    init() { // új játék
        this.#lepesSzam = 0;
        this.#vege = false;
        this.setAllapotLista();
        this.#jatekTer.kirajzol();
        for (let i = 0; i < this.#allapotLista.length; i++) {
            this.#jatekTer.frissit(i, this.#allapotLista[i]);
        }
        this.#jatekTer.eredmeny("Kezdődjön a játék!")
    }

    setAllapotLista() {
        this.#allapotLista = Array(this.#meret ** 2).fill(false).map((x) => Math.random() < .3);
    }

    szomszedokKeresese(id) {
        let szomszedok = [];

        if (id >= this.#meret) { // fel
            szomszedok.push(id - this.#meret);
        }

        if (id + this.#meret < this.#meret ** 2) { // le
            szomszedok.push(id + this.#meret);
        }

        if (id % this.#meret > 0) { // balra
            szomszedok.push(id - 1);
        }

        if (id % this.#meret < this.#meret - 1) {
            szomszedok.push(id + 1); // jobbra
        }
        return szomszedok;
    }

    ellenorzes() {
        for (const lampa of this.#allapotLista) {
            if (!lampa) {
                return false;
            }
        }
        return true;
    }
}