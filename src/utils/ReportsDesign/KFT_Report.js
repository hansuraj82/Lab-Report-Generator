import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import {
    S_CREATININE_RANGE,
    S_UREA_RANGE,
    S_URIC_ACID_RANGE,
    S_CHLORIDE_RANGE,
    S_POTASSIUM_RANGE,
    S_SODIUM_RANGE,
    S_CALCIUM_RANGE
} from "../rangeForTests";

export function KFT_Design(doc, y, KFT_Data) {
    y += 12;
    doc.setFont("times", "bold").setFontSize(16).setTextColor(0, 0, 0);
    doc.text("KIDNEY FUNCTION TEST (K F T):-", 20, y);
    y += 10;


    doc.setFont("times", "normal").setFontSize(12);
    [
        ...S_CREATININE_RANGE,
        ...S_UREA_RANGE,
        ...S_URIC_ACID_RANGE,
        ...S_CHLORIDE_RANGE,
        ...S_POTASSIUM_RANGE,
        ...S_SODIUM_RANGE,
        ...S_CALCIUM_RANGE
    ].forEach((field) => {
        doc.text(field.key, 20, y);
        getArrowValue(KFT_Data[field.key], field.range, doc, 95, y - 4);
        getValOrDash(KFT_Data[field.key], doc, y)
        doc.text(field.range, 137, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 7;

}