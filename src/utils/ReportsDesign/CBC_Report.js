import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import { CBC_MAIN, DIFFERENTIAL_WBC } from "../rangeForTests";




export function CBC_Design(doc, cbcData, y) {
    console.log(cbcData);

    y += 12;
    doc.setFont("Cambria", "bold").setFontSize(12).setTextColor(0, 0, 0);
    doc.text("HAEMATOLOGY", 20, y);
    let HAEMATOLOGY_TEXT = 'HAEMATOLOGY';
    let HAEMATOLOGY_TEXT_WIDTH = doc.getTextWidth(HAEMATOLOGY_TEXT);
    doc.line(20, y + 1, 20 + HAEMATOLOGY_TEXT_WIDTH, y + 1);

    y += 7;
    doc.text("C B C (COMPLETE BLOOD COUNT)", 20, y);
    y += 7;


    doc.setFont("Cambria", "normal").setFontSize(10);
    let arrowVal = false;
    CBC_MAIN.forEach((field) => {
        doc.text(field.key, 20, y);
        if (field.key === "HEMOGLOBIN") {
            console.log(cbcData[field.key]?.raw);
            let hemoValue = '';
            if (cbcData[field.key]?.raw) {
                hemoValue = `${cbcData[field.key]?.raw} / ${cbcData[field.key]?.percent}%`
            }


            arrowVal = getArrowValue(cbcData[field.key]?.raw, field.range, doc, 95, y - 3.5);
            getValOrDash(field.key, hemoValue, doc,100, y,arrowVal);
        }
        else {
            arrowVal = getArrowValue(cbcData[field.key], field.range, doc, 95, y - 3.5);
            getValOrDash(field.key, cbcData[field.key], doc,100, y , arrowVal)
        }

        doc.text(field.range, 137, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;
    });

    y += 4;
    doc.setFont("Cambria", "bold").setFontSize(12);
    doc.text("DIFFERENTIAL COUNT WBC", 20, y);

    y += 10;
    doc.setFont("Cambria", "normal").setFontSize(10);
    DIFFERENTIAL_WBC.forEach((field) => {
        doc.text(field.key, 20, y);
        arrowVal = getArrowValue(cbcData[field.key], field.range, doc, 95, y - 3.5);
        console.log(arrowVal);
        
        getValOrDash(field.key, cbcData[field.key], doc,100, y,arrowVal)
        doc.text(field.range, 135, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;

    });
    return y - 8;
}