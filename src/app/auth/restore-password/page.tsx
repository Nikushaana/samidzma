import ResetPasswordClient from "./ResetPasswordClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {

  return <ResetPasswordClient token={searchParams.token || ""} />;
}