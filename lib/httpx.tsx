import { FormSchema } from "@/components/CustomForm";
import axios from "axios"; // Import Axios at the top of your file
import { z } from "zod";

export async function createCustomer(data: z.infer<typeof FormSchema>) {
  // const endpoint = "http://localhost:3002/api/gorder/createCustomer";
  const endpoint = "http://backend-classer-env.eba-hq9mhwvp.il-central-1.elasticbeanstalk.com/api/gorder/createCustomer";

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
    organizationEmployeeId: "8736ddad-cc50-4375-c95f-08dbef3fb992",
    services: "0",
    paymentFrequency: 1,
    payment: "1",
    secretImgsTxt: "",
    accountManagementMethod: 0,
    WizcloudApiDBName: "",
    organizationId: "1865197c-0d0e-4461-74f8-08dbc4e37956",
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

  axios
    .post(endpoint, body)
    .then((response) => {
      console.log("Success:", response.data); // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error.response || error.message); // Handle any errors
    });
}
