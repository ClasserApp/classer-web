import { postData } from "@/lib/http";

// interface res {
//   message: string;
// }
const createCustomer = async (data: any) => {
  const urlWithParams = `/api/gorder/createCustomer`;
  try {
    const response = await postData(urlWithParams, data, "create Customer failed");
    return { success: true, data: response }; // Cast to IClient, not IClient[]
  } catch (error) {
    let errorMessage = "create customer failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, data: errorMessage };
  }
};

export { createCustomer };
