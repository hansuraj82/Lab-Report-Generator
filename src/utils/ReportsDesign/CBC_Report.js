import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import { CBC_MAIN, DIFFERENTIAL_WBC } from "../rangeForTests";




export function CBC_Design(doc , cbcData , y) {
    y += 12;
    doc.setFont("Cambria", "bold").setFontSize(12).setTextColor(0, 0, 0);
    doc.text("HAEMATOLOGY", 20, y);
    y += 7;
    doc.text("C B C (COMPLETE BLOOD COUNT)", 20, y);
    y += 7;

    
    doc.setFont("Cambria", "normal");
    CBC_MAIN.forEach((field) => {
        doc.text(field.key, 20, y);
        getArrowValue(cbcData[field.key], field.range,doc,95,y-4);
        getValOrDash(cbcData[field.key],doc,y)
        doc.text(field.range, 137, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;
    });

    y += 4;
    doc.setFont("Cambria", "bold").setFontSize(11);
    doc.text("DIFFERENTIAL COUNT WBC", 20, y);

    y += 10;
    doc.setFont("Cambria", "normal");
    DIFFERENTIAL_WBC.forEach((field) => {
        doc.text(field.key, 20, y);
        getArrowValue(cbcData[field.key], field.range,doc,95,y-4);
        getValOrDash(cbcData[field.key],doc,y)
        doc.text(field.range, 135, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;
    
    });
    return y-8 ;
}