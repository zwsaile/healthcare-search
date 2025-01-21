const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const results = [];
const excludedKeywords = [
    "Case Management",
    "Community/Behavioral Health",
    "Day Training, Developmentally Disabled Services",
    "Early Intervention Provider Agency",
    "Foster Care Agency",
    "Home Health",
    "Home Infusion",
    "Hospice Care, Community Based",
    "In Home Supportive Care",
    "Local Education Agency (LEA)",
    "Nursing Care",
    "Program of All-Inclusive Care for the Elderly (PACE) Provider Organization",
    "Public Health or Welfare",
    "Supports Brokerage",
    "Voluntary or Charitable",
    "Epilepsy Unit",
    "Medicare Defined Swing Bed Unit",
    "Psychiatric Unit",
    "Rehabilitation Unit",
    "Rehabilitation, Substance Use Disorder Unit",
    "Christian Science Sanitorium",
    "Chronic Disease Hospital",
    "General Acute Care Hospital",
    "Long Term Care Hospital",
    "Military Hospital",
    "Psychiatric Hospital",
    "Rehabilitation Hospital",
    "Special Hospital",
    "Dental Laboratory",
    "Physiological Laboratory",
    "Exclusive Provider Organization",
    "Health Maintenance Organization",
    "Point of Service",
    "Preferred Provider Organization",
    "Hospice, Inpatient",
    "Lodging",
    "Meals",
    "Respite Care",
    "Blood Bank",
    "Department of Veterans Affairs (VA) Pharmacy",
    "Durable Medical Equipment & Medical Supplies",
    "Emergency Response System Companies",
    "Eye Bank",
    "Eyewear Supplier",
    "Hearing Aid Equipment",
    "Home Delivered Meals",
    "Indian Health Service/Tribal/Urban Indian Health (I/T/U) Pharmacy",
    "Medical Foods Supplier",
    "Military/U.S. Coast Guard Pharmacy",
    "Non-Pharmacy Dispensing Site",
    "Organ Procurement Organization",
    "Pharmacy",
    "Portable X-ray and/or Other Portable Diagnostic Imaging Supplier",
    "Prosthetic/Orthotic Supplier",
    "Air Carrier",
    "Ambulance",
    "Bus",
    "Military/U.S. Coast Guard Transport",
    "Non-emergency Medical Transport (VAN)",
    "Private Vehicle",
    "Secured Medical Transport (VAN)",
    "Taxi",
    "Train",
    "Transportation Broker",
    "Transportation Network Company",
    "Clinic/Center",
    "Religious Nonmedical Health Care Institution",
    "Clinical Medical Laboratory",
    "Military Clinical Medical Laboratory",
    "Alzheimer Center (Dementia Center)",
    "Assisted Living Facility",
    "Christian Science Facility",
    "Custodial Care Facility",
    "Intermediate Care Facility, Intellectual Disabilities",
    "Intermediate Care Facility, Mental Illness",
    "Nursing Facility/Intermediate Care Facility",
    "Skilled Nursing Facility",
    "Community Based Residential Treatment Facility, Mental Illness",
    "Community Based Residential Treatment Facility, Intellectual and/or Developmental Disabilities",
    "Psychiatric Residential Treatment Facility",
    "Residential Treatment Facility, Emotionally Disturbed Children",
    "Residential Treatment Facility, Intellectual and/or Developmental Disabilities",
    "Residential Treatment Facility, Physical Disabilities",
    "Substance Abuse Rehabilitation Facility"
];

// Path to the CSV file
const csvFilePath = path.resolve(__dirname, '../../../public/nucc_taxonomy_241.csv');

// Process the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const { Code, Classification, Specialization } = row;

    // Combine Classification and Specialization with a comma and space
    const combinedClassification = Specialization
      ? `${Classification}, ${Specialization}`
      : Classification;

    // Filter out rows containing excluded keywords
    if (!excludedKeywords.some(keyword => combinedClassification.includes(keyword))) {
      results.push({ code: Code, classification: combinedClassification });
    }
  })
  .on('end', () => {
    // Generate unique classifications array
    const uniqueClassifications = [...new Set(results.map(item => item.classification))];

    // Prepare the final output object
    const output = {
      processedData: results,
      uniqueClassifications: uniqueClassifications
    };

    // Write the processed data to a JSON file
    const outputFilePath = path.resolve(__dirname, 'taxonomyData.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2), 'utf-8');
    console.log('Processed taxonomy data saved to taxonomyData.json');
  });
