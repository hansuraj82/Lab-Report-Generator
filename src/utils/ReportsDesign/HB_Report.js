import { getArrowValue, getValOrDash } from "../utilitiesFunc";
import { HB_RANGE } from "../rangeForTests";

export function HB_Report_Design(doc , HB_value , y) {
    y += 12;
    HB_RANGE.forEach((field) => {
        doc.setFont("times", "bold").setFontSize(12);
        doc.text(field.key, 20, y);
        doc.setFont("times", "bold").setFontSize(12)
        let HB_valueOfFloat = '';
        if(HB_value) {
           HB_valueOfFloat = HB_value.split("/")[0];
        }
        getArrowValue(HB_valueOfFloat,field.range,doc,90,y-4);
        getValOrDash(HB_value,doc,y)
        doc.text(field.range, 137, y);
        doc.text(field.unit, 175, y, { align: "left" });
    })
    return y;
}