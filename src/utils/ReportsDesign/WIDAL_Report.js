import { WIDAL_RANGE } from "../rangeForTests";

export function Widal_Design(doc, y, widalData) {
    console.log('widalData is ', widalData);

    y += 12;
    doc.setFont("Cambria", "normal").setFontSize(12);
    doc.text("WIDAL", 20, y);
    doc.text(WIDAL_RANGE[0].range, 135, y);
    y += 12;

    ["S- TYPHI “O”", "S- TYPHI “H”", "S- TYPHI “AH”", "S- TYPHI “BH”"].forEach((field) => {

        doc.text(field, 25, y);
        if (!widalData[field]?.result || !widalData[field]?.titre) {
            doc.text(`-- IN -:- DILUTION`, 90, y, { align: "left" });
        }
        else {
            doc.text(`${widalData[field].result} IN 1:${widalData[field].titre} DILUTION`, 90, y, { align: "left" });
        }

        y += 12;
    })
    return y - 12;
}