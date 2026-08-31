import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    // dla malych margin botom kilka px
    <div className="flex mb-5 sm:mb-[190px] items-center justify-center bg-[#1a1a1a] px-4 sm:px-6">
      <RegisterForm />
    </div>
  );
}
