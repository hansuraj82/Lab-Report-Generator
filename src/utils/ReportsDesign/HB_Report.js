import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import { HB_RANGE } from "../rangeForTests";

export function HB_Report_Design(doc, HB_value, y) {
    y += 12;
    HB_RANGE.forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 15, y);

        doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0,0,0);
        doc.text(field.key, 22, y);
        doc.setFont("Cambria", "bold");
        let HB_valueOfFloat = '';
        if (HB_value) {
            HB_valueOfFloat = HB_value.split("/")[0];
        }
        getArrowValue(HB_valueOfFloat, field.range, doc, 92, y - 4);
        getValOrDash(field.key, HB_value, doc, 95, y, true);
        doc.setFont("Cambria", "normal")
        doc.text(field.range, 135, y);
        doc.text(field.unit, 175, y, { align: "left" });
    })
    return y;
}