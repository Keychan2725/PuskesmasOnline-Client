import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDrTcxR6wMZ_1_1Y3dDCDUy0D-Yfaj7maM",
  authDomain: "puskesmasonline-43c69.firebaseapp.com",
  projectId: "puskesmasonline-43c69",
  storageBucket: "puskesmasonline-43c69.appspot.com",
  messagingSenderId: "511191068786",
  appId: "1:511191068786:web:d37324df8b7ba5387c52eb",
  measurementId: "G-5LNTNRQWXG",
};

firebase.initializeApp(firebaseConfig);

export default function Otp() {
  const [noTel, setNoTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const auth = getAuth();
  const [lastSentTime, setLastSentTime] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const id = localStorage.getItem("id");

  const renderInput = (props, index) => {
    return <input {...props} />;
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("recaptcha resolved..");
          },
          appVerificationDisabledForTesting: false, // Add this line

          "expired-callback": () => {},
        }
      );
    }
  }
  const getDelayTime = (retryCount) => {
    const baseDelayTime = 1000; // 1 second
    const maxDelayTime = 60000; // 1 minute
    const delayTime = baseDelayTime * Math.pow(2, retryCount);
    return Math.min(delayTime, maxDelayTime);
  };

  const onSignup = () => {
    if (noTel.length >= 10) {
      onCaptchVerify();
      setLoading(true);

      const appVerifier = window.recaptchaVerifier;
      const formatNo = "+" + noTel;
      signInWithPhoneNumber(auth, formatNo, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOtp(true);
          setLoading(false);
          setLastSentTime(new Date());
          toast.success("Berhasil Mengirim Otp");

          const data = {
            noTel: noTel,
          };

          axios
            .put(`http://localhost:8080/api/user/update-otp/${id}`, data)
            .then((response) => {
              console.log(response.data);
              localStorage.setItem("noTel", response.data.noTel);
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 429) {
                setRetryCount(retryCount + 1);
                setTimeout(() => {
                  onSignup();
                }, getDelayTime(retryCount));
              }
            });
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          setLoading(false); // Loading dimatikan saat terjadi kesalahan
        });
    } else {
      toast.error("Nomer Telepon Tidak Boleh Kosong");
      setLoading(false);
    }
  };

  function onOTPVer() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        toast.success("Berhasil Verifikasi");
        const noTel = localStorage.getItem("noTel");
        const data = {
          codeVer: otp,
          noTel: noTel,
        };

        axios
          .put(`http://localhost:8080/api/user/update-otp/${id}`, data)
          .then((response) => {
            console.log(response.data);
            window.location.href = "/login";
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 429) {
              setRetryCount(retryCount + 1);
              setTimeout(() => {
                onSignup();
              }, getDelayTime(retryCount));
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Kode Verifikasi Salah");
      });
  }

  return (
    <>
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="items-center w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center loading-normal text-bray-900 font-medium text-2xl mb-6">
              Selamat Datang Di Pusline
            </h1>
            <Toaster toastOptions={{ duration: 4000 }} />

            {showOtp ? (
              <div>
                <div className=" mb-5 text-rose-600 w-fit mx-auto p-4 rounded-full">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-12v-2m16-4v24h-24v-24h24zm-16-4h6.711c.999 0 1.701-.701 1.701-1.701h1.701c.999 0 1.701-.701 1.701-1.701v-1.701c0-.999-.701-1.701-1.701-1.701h-1.701c-.999 0-1.701.701-1.701 1.701v1.701z"
                    />
                  </svg>
                </div>
                <label
                  htmlFor="ph"
                  className="  5 font-bold text-xl text-bray-900 text-center"
                >
                  Masukan Kode Otp
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  renderInput={renderInput}
                  autoFocus
                  numInputs={6}
                  otpType="number"
                  disabled={false}
                  inputStyle={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "5px",
                  }}
                  className="places-items-center mx-auto"
                />
                <button
                  className="mt-5 text-white bg-rose-600 w-full flex gap-1 items-center justify-center py-2.5 text-white-rounded "
                  onClick={() => {
                    setLoading(true);
                    onOTPVer();
                  }}
                >
                  {loading ? (
                    <svg
                      className="w-5   mt-1 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A4848 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                      />
                    </svg>
                  ) : (
                    <span>Verifikasi Kode</span>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div id="recaptcha-container"></div>

                <div className=" mb-5 text-rose-600 w-fit mx-auto p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </div>
                <label
                  htmlFor="ph"
                  className="  5 font-bold text-xl text-bray-900 text-center"
                >
                  Verifikasi Nomer Telepon
                </label>
                <>
                  <PhoneInput
                    country="id"
                    defaultCountry="id"
                    className="mt-4"
                    value={noTel}
                    onChange={setNoTel}
                  />
                  <button
                    className="mt-5 text-white bg-rose-600 w-full flex gap-1 items-center justify-center py-2.5 text-white-rounded "
                    onClick={() => {
                      setLoading(true);
                      onSignup();
                    }}
                  >
                    {loading ? (
                      <svg
                        className="w-5   mt-1 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A4848 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                        />
                      </svg>
                    ) : (
                      <span>Kirim Kode</span>
                    )}
                  </button>
                </>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
