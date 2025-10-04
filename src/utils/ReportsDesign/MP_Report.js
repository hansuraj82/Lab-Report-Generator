export function MP_card_Design(doc, mpCardResult, y) {
    y += 12;
    doc.setFont("Cambria", "normal").setFontSize(12);
    doc.text("MP CARD", 20, y);

    if (mpCardResult) {
        let x = 95;

        if (mpCardResult.startsWith("P F") || mpCardResult.startsWith("P V")) {
            // split the first 2-letter marker ("P F" or "P V") and the rest
            const [marker, ...rest] = mpCardResult.split(" ");

            // combine first 2 parts (P and F/V)
            const firstPart = `${marker} ${rest.shift()}`;

            // draw "P F" or "P V" in red
            doc.setFont("Cambria", "bold").setFontSize(11).setTextColor(255, 0, 0);
            doc.text(firstPart, x, y);
            x += doc.getTextWidth(firstPart + " ");

            // draw remaining words in black
            doc.setTextColor(0, 0, 0);
            rest.forEach((word) => {
                doc.text(word, x, y);
                x += doc.getTextWidth(word + " ");
            });
        } else {
            // default case (like "NEGATIVE")
            doc.setFont("Cambria", "bold").setFontSize(11).setTextColor(0, 0, 0);
            doc.text(mpCardResult, x, y);
        }

        doc.setTextColor(0, 0, 0); // reset
    }

    return y;
}
