"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Image from "next/image";
import * as Yup from "yup";
import Input1 from "@/app/components/Inputs/Input1";
import CheckBox from "@/app/components/Inputs/CheckBox";
import GreenButton from "@/app/components/buttons/greenButton";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";

export default function SignUp() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();
  const [userSignUpLoader, setUserSignUpLoader] = useState<boolean>(false);
  const [checkUserPersonalCodeLoader, setCheckUserPersonalCodeLoader] =
    useState<boolean>(false);
  const [userSignUpValues, setUserSignUpValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",

    type: 1,
    personal_code: "",
    personal_code_valid_data: {
      AdditionalStatus: null,
      FullName: null,
      Mortgage: null,
      NonResident: null,
      RegisteredSubject: null,
      Sequestration: null,
      StartDate: null,
      Status: null,
      VatPayer: null,
    },
    address: "",

    password: "",
    rePassword: "",

    confirmLaws: false,
  });

  const [errors, setErrors] = useState<any>({});

  // check personal_code
  const HandleCheckUserPersonalCode = () => {
    if (userSignUpValues.type == 2) {
      if (userSignUpValues.personal_code) {
        setCheckUserPersonalCodeLoader(true);

        axiosUser
          .get(
            `testing/getRSPublicInfo?personalCode=${userSignUpValues.personal_code}`
          )
          .then((res) => {
            setUserSignUpValues((prev: any) => ({
              ...prev,
              personal_code_valid_data: res.data[0],
              name: res.data[0].FullName || "",
            }));

            if (res.data[0].Status !== "აქტიური") {
              setAlertShow(true);
              setAlertStatus(false);
              setAlertText("საიდენტიფიკაციო ნომერი არ არის ვალიდური!");
            } else {
              setAlertShow(true);
              setAlertStatus(true);
              setAlertText("საიდენტიფიკაციო ნომერი ვალიდურია");
            }
          })
          .catch((err) => {
            setAlertShow(true);
            setAlertStatus(false);
            setAlertText("საიდენტიფიკაციო ნომერი არ არის ვალიდური!");
          })
          .finally(() => {
            setCheckUserPersonalCodeLoader(false);
          });
      } else {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("საიდენტიფიკაციო ნომერი სავალდებულოა");
      }
    }
  };
  // check personal_code

  // registration
  const validationSchema = Yup.object({
    name: Yup.string().required("სახელი სავალდებულოა"),
    surname: Yup.string().when("type", {
      is: "1",
      then: (schema) => schema.required("გვარი სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),
    email: Yup.string()
      .required("მეილი სავალდებულოა")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
        "გთხოვთ, შეიყვანოთ ვალიდური ელ.ფოსტა"
      ),

    phone: Yup.string().required("ტელეფონის ნომერი სავალდებულოა"),
    type: Yup.string().required("მომხმარებლის ტიპი სავალდებულოა"),

    personal_code: Yup.string().when("type", {
      is: "2",
      then: (schema) => schema.required("საიდენტიფიკაციო ნომერი სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),
    personal_code_valid_data: Yup.object().when("type", {
      is: "2",
      then: (schema) =>
        schema.test(
          "non-resident-check",
          "შეავსე ვალიდური საიდენტიფიკაციო ნომერი!",
          (value: any) => {
            return value?.Status == "აქტიური";
          }
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    address: Yup.string().when("type", {
      is: "2",
      then: (schema) => schema.required("მისამართი სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),

    password: Yup.string()
      .required("პაროლი სავალდებულოა")
      .oneOf([Yup.ref("rePassword")], "პაროლები უნდა ემთხვეოდეს"),
    rePassword: Yup.string()
      .required("პაროლის განმეორება სავალდებულოა")
      .oneOf([Yup.ref("password")], "პაროლები უნდა ემთხვეოდეს"),
  });

  const handleUserSignUpValidation = () => {
    validationSchema
      .validate(userSignUpValues, { abortEarly: false })
      .then(() => {
        setErrors({});

        HandleUserSignUp();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(
          newErrors.name ||
            newErrors.surname ||
            newErrors.email ||
            newErrors.phone ||
            newErrors.personal_code ||
            newErrors.personal_code_valid_data ||
            newErrors.address ||
            newErrors.password ||
            newErrors.rePassword
        );
      });
  };

  const HandleUserSignUp = () => {
    setUserSignUpLoader(true);

    axiosUser
      .post("userAuth/singUp", {
        name: userSignUpValues.name,
        surname: userSignUpValues.type == 1 ? userSignUpValues.surname : "",
        email: userSignUpValues.email,
        type: userSignUpValues.type,
        personal_code:
          userSignUpValues.type == 2 ? userSignUpValues.personal_code : "",
        company_name:
          userSignUpValues.type == 2
            ? userSignUpValues.personal_code_valid_data.FullName
            : "",
        dgg_pay:
          userSignUpValues.type == 2 &&
          (userSignUpValues.personal_code_valid_data.VatPayer == "კი"
            ? true
            : false),
        address: userSignUpValues.type == 2 ? userSignUpValues.address : "",
        phone:
          userSignUpValues.phone && userSignUpValues.phone?.replace(/\s/g, ""),
        password: userSignUpValues.password,
      })
      .then((res) => {
        setUserSignUpValues({
          name: "",
          surname: "",
          email: "",
          phone: "",
          type: 1,
          personal_code: "",
          personal_code_valid_data: {
            AdditionalStatus: null,
            FullName: null,
            Mortgage: null,
            NonResident: null,
            RegisteredSubject: null,
            Sequestration: null,
            StartDate: null,
            Status: null,
            VatPayer: null,
          },
          address: "",
          password: "",
          rePassword: "",
          confirmLaws: false,
        });
        router.push("/auth/signin");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რეგისტრაცია წარმატებით შესრულდა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("რეგისტრაცია ვერ შესრულდა");
      })
      .finally(() => {
        setUserSignUpLoader(false);
      });
  };
  // registration

  return (
    <div
      className={`flex flex-col gap-y-[16px] px-[30px] max-sm:p-[20px] py-[40px] duration-100 ${
        userSignUpLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="hidden max-sm:flex flex-col">
        <h1 className="text-[22px]">საკონტაქტო ფორმა</h1>
        <p className="text-[14px]">შეავსე ფორმა, რათა დაგვიკავშირდეთ</p>
      </div>
      <div className={`flex flex-col gap-y-[16px]`}>
        <div
          onClick={() => {
            setUserSignUpValues((pre: any) => ({
              ...pre,
              type: pre.type == 1 ? 2 : 1,
            }));
          }}
          className="flex items-center gap-[10px] cursor-pointer self-start"
        >
          <CheckBox active={userSignUpValues.type == 2} />
          <p className="text-[14px] select-none">იურიდიული პირი</p>
        </div>
        {userSignUpValues.type == 2 && (
          <>
            <div
              className={`flex gap-[10px] max-tiny:flex-col duration-100 ${
                checkUserPersonalCodeLoader &&
                "pointer-events-none opacity-[0.5]"
              }`}
            >
              <Input1
                placeholder="საიდენტიფიკაციო ნომერი"
                name="personal_code"
                setAllValues={setUserSignUpValues}
                error={errors.personal_code || errors.personal_code_valid_data}
              />
              <div className="w-[150px] shrink-0 max-tiny:self-center">
                <GreenButton
                  name="შემოწმება"
                  action={HandleCheckUserPersonalCode}
                  loader={checkUserPersonalCodeLoader}
                  style="h-[52px] max-sm:h-[42px] text-[16px]"
                />
              </div>
            </div>
            {userSignUpValues.personal_code_valid_data.Status == "აქტიური" && (
              <h1 className="text-center">
                `{userSignUpValues.personal_code_valid_data.FullName}`{" "}
                {userSignUpValues.personal_code_valid_data.VatPayer == "კი"
                  ? "დღგ-ს გადამხდელია."
                  : "არ არის დღგ-ს გადამხდელი."}
              </h1>
            )}
          </>
        )}
        <Input1
          placeholder="სახელი"
          name="name"
          type="text"
          firstValue={userSignUpValues.name}
          setAllValues={setUserSignUpValues}
          error={errors.name}
        />
        {userSignUpValues.type == 2 && (
          <Input1
            placeholder="მისამართი"
            name="address"
            setAllValues={setUserSignUpValues}
            error={errors.address}
          />
        )}
        {userSignUpValues.type == 1 && (
          <Input1
            placeholder="გვარი"
            name="surname"
            type="text"
            setAllValues={setUserSignUpValues}
            error={errors.surname}
          />
        )}
        <Input1
          placeholder="ტელეფონის ნომერი"
          name="phone"
          type="text"
          isNumber={true}
          setAllValues={setUserSignUpValues}
          error={errors.phone}
        />
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          setAllValues={setUserSignUpValues}
          error={errors.email}
        />
        <Input1
          placeholder="პაროლი"
          isPassword={true}
          name="password"
          setAllValues={setUserSignUpValues}
          error={errors.password}
        />
        <Input1
          placeholder="გაიმეორე"
          isPassword={true}
          name="rePassword"
          setAllValues={setUserSignUpValues}
          error={errors.rePassword}
        />
      </div>

      <div
        onClick={() => {
          setUserSignUpValues((pre: any) => ({
            ...pre,
            confirmLaws: !userSignUpValues.confirmLaws,
          }));
        }}
        className="flex items-center gap-[10px] cursor-pointer self-start"
      >
        <CheckBox active={userSignUpValues.confirmLaws} />
        <p className="text-[14px] select-none">
          ვეთანხმები წესებსა და პირობებს
        </p>
      </div>

      <GreenButton
        name="რეგისტრაცია"
        action={handleUserSignUpValidation}
        loader={userSignUpLoader}
        style="h-[56px] text-[18px]"
      />

      <h1 className="text-center text-[#8A8A8A] mt-[10px] max-sm:text-[12px]">
        დაგვიკავშირდით ტელეფონის ნომერზე ან სოციალურ ქსელის საშუალებით:
      </h1>
      <div className="flex items-center justify-center gap-[30px]">
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href={`tel:0322047007`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition text-[25px]"
          >
            <BsTelephone />
          </a>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href="https://www.instagram.com/samidzma.ge/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition text-[30px]"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href="https://www.facebook.com/samidzma.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition text-[30px]"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
      <p className="text-[14px] text-[#8A8A8A] text-center max-sm:text-[10px]">
        რეგისტრაციის ღილაკზე დაჭერით, შენ ეთანხმები ჩვენს წესებსა და პირობებს და
        კონფიდენციალურობის პოლიტიკას. ჩვენ არ გადავცემთ შენს პირად ინფორმაციას
        მესამე პირს. არც სპამ-მეილებით შეგაწუხებთ.
      </p>
    </div>
  );
}
