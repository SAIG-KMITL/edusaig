import BackgroundContainer from "@/components/Containers/BackgroundContainer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundContainer>
      <div>{children}</div>
    </BackgroundContainer>
  );
}