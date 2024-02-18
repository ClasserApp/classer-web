import { z } from "zod";
import { FormSchema } from "@/components/CustomForm";

export const newCustomerRequest = (data: z.infer<typeof FormSchema>) => {
  const organizationEmployeId = process.env.organizationEmployeeId;
  const organizationID = process.env.organizationId;
  const req = {
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

  return req;
};
