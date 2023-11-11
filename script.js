import JatekController from "./controller/JatekController.js";

$(function () {
    const MERET = 3;

    let szuloElem = $(".jatekter");
    let jc = new JatekController(MERET, szuloElem)
    let id = 0;
    let sz1 = jc.szomszedokKeresese(id);

})

