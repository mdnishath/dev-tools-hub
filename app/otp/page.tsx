import OtpGenaretor from "@/components/Tools/Otp-Generator";

export default function OTPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
          🔐 OTP Generator
        </h1>
        <p className="text-slate-600 mb-6 text-center">
          Instantly convert your Google Authenticator key to a secure code.
        </p>
        {/* Insert your UUID tool component here */}
      </div>
      <OtpGenaretor />
    </div>
  );
}
