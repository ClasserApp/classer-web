import { FormSchema } from "@/components/CustomForm";
import axios from "axios"; // Import Axios at the top of your file
import { z } from "zod";

export async function createCustomer(data: z.infer<typeof FormSchema>) {
  // const endpoint = "http://localhost:3002/api/gorder/createCustomer";
  // const endpoint = "http://backend-classer-env.eba-hq9mhwvp.il-central-1.elasticbeanstalk.com/api/gorder/createCustomer";
  const endPoint =
    process.env.endpoint || "http://backend-classer-env.eba-hq9mhwvp.il-central-1.elasticbeanstalk.com/api/gorder/createCustomer";
  const organizationEmployeId = process.env.organizationEmployeeId;
  const organizationID = process.env.organizationId;

  console.log("Endpoint:", process.env.endpoint);
  console.log("Organization Employee ID:", process.env.organizationEmployeeId);
  console.log("Organization ID:", process.env.organizationId);

  console.log(endPoint);
  const body = {
    businessName: data.OwnerEntryName,
    customerMainContactName: data.OwnerEntryName + data.OwnerEntryLastName,
    address: "כתובת",
    userName: "user" + data.OwnerEntryIdentity,
    email: data.email,
    phone: data.phone,
    telephone: "",
    fax: "",
    webSite: "",
    BusinessOpenDate: "2024-02-12T23:28",
    Additions: "",
    businessType: 2,
    customerActivityTypeId: "cad741e3-0fb4-4d6e-2032-08d8b25c8ae4",
    birthdate: "2024-02-12",
    gender: "0",
    maritalStatus: "4",
    businessNumber: data.OwnerEntryIdentity,
    tax: 4,
    incomeTaxFileNumber: data.OwnerEntryIdentity,
    incomeTaxAdvancePayments: 1,
    taxAdvancesPercentText: "2",
    incomeTaxAdvancePaymentsTxt: "",
    nationalInsuranceMonthlyAdvancePaymentText: "3",
    isHaveEmployees: false,
    deductionFileNumber: "",
    NationalInsuranceDeductionSelectorContainer2: "",
    NationalInsuranceDeductionIDField: "",
    reportingFrequency: 1,
    accountingType: 0,
    organizationEmployeeId: organizationEmployeId,
    services: "0",
    paymentFrequency: 1,
    payment: "1",
    secretImgsTxt: "",
    accountManagementMethod: 0,
    WizcloudApiDBName: "",
    organizationId: organizationID,
    incomeTaxDeduction: null,
    nationalInsuranceDeduction: null,
    customerOwners: [
      {
        OwnerEntryName: data.OwnerEntryName,
        OwnerEntryLastName: data.OwnerEntryLastName,
        OwnerEntryBD: "2024-02-12",
        OwnerEntryIdentity: data.OwnerEntryIdentity,
        OwnerEntryPercent: "0",
        OwnerEntryGender: 0,
        OwnerEntryMaritalStatus: 1,
      },
    ],
    Children: [],
  };

  try {
    const response = await axios.post(endPoint, body);
    console.log("Success:", response.data.message); // Handle the response data
    return response.data; // Optionally return the response data for further processing
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // This will check if the error is an Axios error
      console.error("Errorr:", error.response?.data || error.message); // Improved error handling
      return error.response?.data || error.message;
    } else {
      // This is for non-Axios errors
      console.error("Unexpected error:", error);
    }
    throw error; // Rethrow the error if you want calling code to handle it as well.
  }
}
