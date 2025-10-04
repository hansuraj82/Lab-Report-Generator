import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import { ALB_GLOBULIN_RATIO_RANGE, ALBUMIN_RANGE, GLOBULIN_RANGE, HB_RANGE, S_ALKALINE_PHOSPHATE_RANGE, S_BILLIRUBIN_RANGE, SGOT_RANGE, SGPT_RANGE, TOTAL_PROTEIN_RANGE } from "../rangeForTests";

export function LFT_Design(doc, y, LFT_Data) {
    y += 12;
    doc.setFont("Cambria", "bold").setFontSize(16).setTextColor(0, 0, 0);
    doc.text("LIVER FUNCTION TEST (L F T):-", 18, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(" S BILLIRUBIN", 20, y);
    y += 10;


    doc.setFont("Cambria", "normal").setFontSize(12);;
    [...S_BILLIRUBIN_RANGE, ...SGPT_RANGE, ...SGOT_RANGE, ...S_ALKALINE_PHOSPHATE_RANGE, ...TOTAL_PROTEIN_RANGE, ...ALBUMIN_RANGE, ...GLOBULIN_RANGE, ...ALB_GLOBULIN_RATIO_RANGE].forEach((field) => {
        doc.text("•",16,y)
        doc.text(field.key, 20, y);
        getArrowValue(LFT_Data[field.key], field.range ,doc,95 , y-4);
        getValOrDash(LFT_Data[field.key],doc,y)
        doc.text(field.range, 137, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 7;

}