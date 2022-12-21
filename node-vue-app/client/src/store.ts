import { reactive } from "vue";

export interface IUPIResponse {
  name: string;
  paymentLink: Record<string, any>;
  platformBillID: string;
}

export const store = reactive({
  UPIResponse: <IUPIResponse>{},
  setUPIResponse(props: IUPIResponse) {
    this.UPIResponse = props;
  },
  mockResponse: {},
  setMockResponse(props: Record<string, any>) {
    this.mockResponse = props;
  },
});
