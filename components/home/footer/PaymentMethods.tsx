import ApplePayIcon from "@/components/icons/paymentMethod/ApplePayIcon";
import GooglePayIcon from "@/components/icons/paymentMethod/GooglePayIcon";
import MastercardIcon from "@/components/icons/paymentMethod/MastercardIcon";
import PaypalIcon from "@/components/icons/paymentMethod/PaypalIcon";
import VisaIcon from "@/components/icons/paymentMethod/VisaIcon";

export default function PaymentMethods() {
  return (
    <div className="flex flex-wrap">
      <VisaIcon />

      <MastercardIcon />

      <PaypalIcon />

      <ApplePayIcon />

      <GooglePayIcon />
    </div>
  );
}
