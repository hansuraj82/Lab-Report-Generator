import { jsPDF } from "jspdf";
import "../utils/Cambria-Italic";
import "../utils/Cambria.js";
import "../utils/CambriaMath.js";
import "../utils/Cambria-Bold.js";

import { CBC_Design } from "../utils/ReportsDesign/CBC_Report";
import { MP_card_Design } from "../utils/ReportsDesign/MP_Report";
import { HB_Report_Design } from "../utils/ReportsDesign/HB_Report";
import { LFT_Design } from "../utils/ReportsDesign/LFT_Report";
import { HeadingLogo, signture } from "../utils/Base64File/Logo";
import { KFT_Design } from "../utils/ReportsDesign/KFT_Report";
import { Widal_Design } from "../utils/ReportsDesign/WIDAL_Report.js";


const generatePdf = ({
    patientName,
    age,
    gender,
    address,
    refBy,
    cbcData,
    selectedReports,
    setPdfUrl,
    setShowPreview,
    mpCardResult,
    HB_value,
    LFT_Data,
    KFT_Data,
    widalData
}) => {
    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0);
    doc.setFont("Cambria", "bold")



    let x = 10;
    // Header Text
    // doc.setFontSize(52).setFont("times", "bold").setTextColor(64, 131, 238);
    // doc.text("FAMOUS PATHO LAB", 105, 20, { align: "center" });
    doc.addImage(`data:image/png;base64,${HeadingLogo}`, "PNG", x, 10, 192.4, 16.3);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10).setFont("Cambria", "normal");
    doc.text("ESTD:- 2004", 3, 5);
    doc.setFontSize(18).setFont("Cambria", "bold");
    doc.text("MAHAVIR CHOWK, PRATAPPUR (CHATRA)", 105, 33, { align: "center" });
    doc.setFontSize(14).setFont("Cambria", "bold");
    doc.text("CONTACT NO:- 9770788771 ,9341423645", 105, 39, { align: "center" });
    doc.rect(0, 41, 225, 0);
    // Patient Info
    doc.setFontSize(12);
    doc.text(`PATIENT NAME : ${patientName.toUpperCase()}`, 20, 48);
    doc.text(`GENDER`, 20, 56);
    doc.text(`: ${age} YEARS / ${gender}`, 54, 56)


    doc.text(`TEST DATE : ${new Date().toLocaleDateString()}`, 140, 48);
    doc.text(`ADDRESS`, 140, 56);
    doc.text(`: ${address.toUpperCase()}`, 165, 56)


    doc.text(`REF. BY`, 20, 64);
    doc.text(`: ${refBy.toUpperCase()}`, 54, 64)

    doc.text(`S.NO `, 140, 64);
    doc.text(`: `, 165, 64)

    //Thanks for referal line

    let y = 75;
    doc.setFont("Cambria", "italic");
    doc.text("THANKS FOR REFERAL", 105, 72, { align: "center" });


    // Full Boundary
    doc.rect(15, 73, 193, 205);

    //investigation , value, range  and unit boundary
    doc.rect(15, 83, 193, 0)

    // //investigation and value
    // doc.setTextColor(0, 0, 0).setFontSize(11).setFont("times", "bold");
    // doc.text("INVESTIGATIONS", 22, 75);
    // doc.text("VALUE", 95, 75);
    // doc.text("REF. RANGE", 135, 75);
    // doc.text("UNIT", 185, 75, { align: "right" });

    // Investigation and Value header
    doc.setTextColor(0, 0, 0).setFontSize(11).setFont("Cambria", "bold");

    if (selectedReports.length === 1 && selectedReports[0] === "MP card") {
        // Only MP card selected
        doc.text("INVESTIGATIONS", 20, 79);
        doc.text("RESULT", 95, 79);
        y = 79
    } else {
        // CBC or multiple reports
        doc.text("INVESTIGATIONS", 20, 79);
        doc.text("VALUE", 95, 79);
        doc.text("REF. RANGE", 135, 79);
        doc.text("UNIT", 185, 79, { align: "right" });
        y = 79
    }



    // CBC Section
    if (selectedReports.includes("CBC")) {
        y = CBC_Design(doc, cbcData, y)
    }

    // Extra Sections
    // const addSection = (title, data, storedTotalDataAsRange) => {
    //     y += 12;
    //     storedTotalDataAsRange.forEach((field) => {
    //         doc.setFont("times", "bold").setFontSize(12);
    //         doc.text(title, 22, y);
    //         doc.setFont("times", "bold").setFontSize(12).setTextColor(255, 0, 0);
    //         doc.text(`${data[title]} `, 95, y);
    //     })

    // };
    if (selectedReports.includes("MP card")) {
        y = MP_card_Design(doc, mpCardResult, y)
    }

    if (selectedReports.includes("HB")) {
        y = HB_Report_Design(doc, HB_value, y);
    }


    if (selectedReports.includes("LFT")) {
        y = LFT_Design(doc, y, LFT_Data);
    }

    if (selectedReports.includes("KFT")) {
        y = KFT_Design(doc, y, KFT_Data);
    }

        if (selectedReports.includes("Widal")) {
        y = Widal_Design(doc, y, widalData);
    }


    //End of result line after all data
    y += 12;
    doc.setFont("cambria", "italic").setTextColor(0, 0, 0);
    doc.text("…................ .END OF REPORT……………", 105, y, { align: "center" });

    // Footer
    // Footer
    y = 276;
    doc.setTextColor(0, 0, 0).setFont("cambria", "normal");
    doc.text("FULLY AUTOMATED LAB", 105, y, { align: "center" });

    doc.addImage(`data:image/png;base64,${signture}`, "PNG", 150, y - 28, 60, 25);

    doc.text("Service Incharge", 160, y);


    y += 6;
    doc.setFont("cambria", "italic").setTextColor(128, 128, 128);
    doc.text("- : NOT VALID FOR MEDICO-LEGAL PURPOSE :-", 105, y, { align: "center" });

    y += 6;
    doc.setTextColor(0, 0, 0).setFont("cambria", "normal");
    doc.text('"THE ENDLESS CARE BEGINS HEREWITH IMPROVED QUALITY"', 105, y, { align: "center" });

    // Preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setShowPreview(true);
};


export { generatePdf };