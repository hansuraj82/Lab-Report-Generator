import { HigherArrow, LowerArrow } from "./Base64File/Logo";

function lowerVal(doc,x,y) {
    doc.addImage(`data:image/png;base64,${LowerArrow}`, "PNG", x, y, 3, 5);
}

function higherVal(doc,x,y) {
doc.addImage(`data:image/png;base64,${HigherArrow}`, "PNG", x, y, 3, 5);
}

export const getArrowValue = (val, range, doc, x,y) => {

    if (!val || !range.includes("-")) return val || "-";

    const [low, high] = range.split("-").map(n => parseFloat(n.trim()));
    const num = parseFloat(val.trim());

    if (isNaN(num)) return val; // not a number, just return original

    if (num < low) return lowerVal(doc,x,y);
    if (num > high) return higherVal(doc,x,y);
    return val;
};

export function getValOrDash(val,doc,y) {
    if (!val || val==' / %') {
        doc.text("-",100,y)
    }
    else {
        doc.text(`${val}`,100, y)
    }
    
}
