import React, { useState, useEffect } from "react";
import { generatePdf } from "./genPdf/GeneratePdf";
import {
  //LFT RANGE
  ALB_GLOBULIN_RATIO_RANGE,
  ALBUMIN_RANGE,
  CBC_MAIN, DIFFERENTIAL_WBC,
  GLOBULIN_RANGE,
  HB_RANGE,
  S_ALKALINE_PHOSPHATE_RANGE,
  S_BILLIRUBIN_RANGE,
  SGOT_RANGE,
  SGPT_RANGE,
  TOTAL_PROTEIN_RANGE,
  //KFT RANGE
  S_CREATININE_RANGE,
  S_UREA_RANGE,
  S_URIC_ACID_RANGE,
  S_CHLORIDE_RANGE,
  S_POTASSIUM_RANGE,
  S_SODIUM_RANGE,
  S_CALCIUM_RANGE
} from "./utils/rangeForTests";





export default function ReportGenerator() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [refBy, setRefBy] = useState("");
  const [serialNo, setSerialNo] = useState();
  const [cbcData, setCbcData] = useState({});
  const [LFT_Data, setLFT_Data] = useState({});
  const [KFT_Data, setKFT_Data] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [mpCardResult, setMpCardResult] = useState("");

  const [widalData, setWidalData] = useState({});
  console.log(widalData);


  const [HB_Float_Value, set_HB_Float_Value] = useState("");
  const [HB_Percent_Value, set_HB_Percent_Value] = useState("");
  const [HB_value, setHB_value] = useState("");

  const [selectedReports, setSelectedReports] = useState([]);


  const [doctorList, setDoctorList] = useState([
    "R kumar",
    "Abhimany doctor",
    "Rajesh doctor",
    "Murari doctor",
    "DR NANDANI HERBAL HEALTH CARE"
  ]);
  const [newDoctor, setNewDoctor] = useState("");



  const handleCBCChange = (field, value) => {
    setCbcData({ ...cbcData, [field]: value });
  };


  const handleLFTChange = (field, value) => {
    setLFT_Data({ ...LFT_Data, [field]: value });
  }

  const handleKFTChange = (field, value) => {
    setKFT_Data({ ...KFT_Data, [field]: value });
  };




  const handleReportSelection = (report) => {
    setSelectedReports((prev) =>
      prev.includes(report)
        ? prev.filter((r) => r !== report)
        : [...prev, report]
    );
  };



  const handleAddDoctor = () => {
    if (newDoctor.trim()) {
      setDoctorList([...doctorList, newDoctor]);
      setRefBy(newDoctor);
      setNewDoctor("");
    }
  };



  //if cbc is selected then HB , kft , lft and widal should not be selected
  const isDisabled = (report, selectedReports) => {
    const isCBCSelected = selectedReports.includes("CBC");
    return report !== "CBC" && report !== "MP card" && isCBCSelected;
  };
  //this is for merge HB value with the percent value and the main value
  useEffect(() => {
    setHB_value(`${HB_Float_Value} / ${HB_Percent_Value}%`)
  }, [HB_Float_Value, HB_Percent_Value])


  const handleGeneratePdf = () => {
    generatePdf({
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
    })
  }





  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
            FAMOUS PATHO LAB
          </h1>

          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="border p-2 rounded" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <input className="border p-2 rounded" type="number" min={1} max="100" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

            {/* Gender Select */}
            <select className="border p-2 rounded" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>

            <input className="border p-2 rounded" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            {/* Doctor Select */}
            <select className="border p-2 rounded col-span-2" value={refBy} onChange={(e) => setRefBy(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctorList.map((doc, idx) => (
                <option key={idx} value={doc}>{doc}</option>
              ))}
            </select>

            {/* Add new doctor */}
            <div className="flex col-span-2 gap-2">
              <input className="border p-2 rounded flex-1" placeholder="Add new doctor" value={newDoctor} onChange={(e) => setNewDoctor(e.target.value)} />
              <button onClick={handleAddDoctor} className="bg-green-500 text-white px-4 rounded">Add</button>
            </div>
          </div>

          {/* Report Options */}
          <h2 className="font-semibold mb-2 text-gray-700">SELECT REPORT</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* {["CBC", "HB", "Widal", "MP card", "KFT", "LFT"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input type="checkbox" checked={selectedReports.includes(r)} onChange={() => handleReportSelection(r)} />
                <span>{r}</span>
              </label>
            ))} */}

            {["CBC", "HB", "Widal", "MP card", "KFT", "LFT", "S BILLIRUBIN", "SGPT", "SGOT", "S ALKALINE PHOSHATE", "TOTAL PROTEIN", "ALBUMIN", "GLOBULIN", "ALB/GLOBULIN RATIO", "S. CREATININE", "S. UREA", "S.URIC ACID", "S. CHLORIDE", "S . POTASSIUM", "S . SODIUM", "S. CALCIUM"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(r)}
                  onChange={() => handleReportSelection(r)}
                  disabled={isDisabled(r, selectedReports)}
                />
                <span className={isDisabled(r, selectedReports) ? "text-gray-400" : ""}>
                  {r}
                </span>
              </label>
            ))}



          </div>

          {/* CBC Inputs only if selected */}
          {selectedReports.includes("CBC") && (
            <>
              <h2 className="font-semibold mb-2 text-gray-700">CBC Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  border p-3 rounded">
                {[...CBC_MAIN, ...DIFFERENTIAL_WBC].map((field) => (
                  <input key={field.key} className="border p-2 rounded" placeholder={`${field.key} (${field.unit})`} value={cbcData[field.key] || ""} onChange={(e) => handleCBCChange(field.key, e.target.value)} />
                ))}
              </div>
            </>
          )}

          {selectedReports.includes("MP card") && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-gray-700">M P Card Result</h2>
              <select
                className="border p-2 rounded w-full"
                value={mpCardResult}
                onChange={(e) => setMpCardResult(e.target.value)}
              >
                <option value="">Select Result</option>
                <option value="P F POSITIVE (WEAK)">P F POSITIVE (WEAK)</option>
                <option value="P F POSITIVE">P F POSITIVE</option>
                <option value="P V POSITIVE">P V POSITIVE</option>
                <option value="NEGATIVE">NEGATIVE</option>
              </select>
            </div>
          )}

          {/* Widal Test */}
          {selectedReports.includes("Widal") && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-gray-700">WIDAL TEST</h2>

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 border p-3 rounded text-sm font-semibold bg-gray-100">
                <span>Test</span>
                <span>Result</span>
                <span>Titre</span>
                <span>Remarks</span>
              </div>

              {/* Table Rows */}
              {["S- TYPHI “O”", "S- TYPHI “H”", "S- TYPHI “AH”", "S- TYPHI “BH”"].map((test) => (
                <div
                  key={test}
                  className="grid grid-cols-4 gap-4 border-b p-2 items-center"
                >
                  {/* Column 1: Key */}
                  <span className="font-semibold">{test}</span>

                  {/* Column 2: Select */}
                  <select
                    className="border p-2 rounded"
                    value={widalData[test]?.result || ""}
                    onChange={(e) =>
                      setWidalData({
                        ...widalData,
                        [test]: { ...widalData[test], result: e.target.value },
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="+VE">+VE</option>
                    <option value="NEG">NEG</option>
                  </select>

                  {/* Column 3: Input (Titre) */}
                  <input
                    className="border p-2 rounded"
                    placeholder="Titre"
                    value={widalData[test]?.titre || ""}
                    onChange={(e) =>
                      setWidalData({
                        ...widalData,
                        [test]: { ...widalData[test], titre: e.target.value },
                      })
                    }
                  />

                  {/* Column 4: Input (Remarks) */}
                  <input
                    className="border p-2 rounded"
                    placeholder="Remarks"
                    value={widalData[test]?.remarks || ""}
                    onChange={(e) =>
                      setWidalData({
                        ...widalData,
                        [test]: { ...widalData[test], remarks: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          )}



          {/* Hemoglobin line */}
          {selectedReports.includes("HB") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">HEMOGLOBIN VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto border p-3 rounded">
                {HB_RANGE.map(field => (
                  <input key={field.key} className="border p-2 rounded" placeholder={`HEMOGLOBIN VALUE (${field.unit})`} value={HB_Float_Value || ""} onChange={(e) => set_HB_Float_Value(e.target.value)} />

                ))}
                <input className="border p-2 rounded" placeholder="PERCENT VALUE" value={HB_Percent_Value || ""} onChange={(e) => set_HB_Percent_Value(e.target.value)} />
              </div>
            </div>
          )}
          {/* LFT TEST */}
          {selectedReports.includes("LFT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">LFT VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_RANGE, ...SGPT_RANGE, ...SGOT_RANGE, ...S_ALKALINE_PHOSPHATE_RANGE, ...TOTAL_PROTEIN_RANGE, ...ALBUMIN_RANGE, ...GLOBULIN_RANGE, ...ALB_GLOBULIN_RATIO_RANGE].map(field => (
                    <input key={field.key} className="border p-2 rounded" placeholder={`${field.key} (${field.unit})`} value={LFT_Data[field.key] || ""} onChange={(e) => handleLFTChange(field.key, e.target.value)} />
                  ))
                }
              </div>

            </div>
          )}

          {/* KFT TEST */}
          {selectedReports.includes("KFT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">KFT VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded">
                {
                  [
                    ...S_CREATININE_RANGE,
                    ...S_UREA_RANGE,
                    ...S_URIC_ACID_RANGE,
                    ...S_CHLORIDE_RANGE,
                    ...S_POTASSIUM_RANGE,
                    ...S_SODIUM_RANGE,
                    ...S_CALCIUM_RANGE
                  ].map(field => (
                    <input
                      key={field.key}
                      className="border p-2 rounded"
                      placeholder={`${field.key} (${field.unit})`}
                      value={KFT_Data?.[field.key] || ""}
                      onChange={(e) => handleKFTChange(field.key, e.target.value)}
                    />
                  ))
                }
              </div>
            </div>
          )}



          {/* Button */}
          <button onClick={handleGeneratePdf} className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Generate Report (Preview)
          </button>
        </div>

        {/* Fullscreen Preview */}
        {showPreview && pdfUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-50">
            <div className="flex justify-between items-center bg-white p-4">
              <h2 className="text-lg font-bold">Report Preview</h2>
              <button onClick={() => setShowPreview(false)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
            </div>
            <iframe src={pdfUrl} className="flex-1 w-full bg-white"></iframe>
          </div>
        )}
      </div>
    </>
  );
}
