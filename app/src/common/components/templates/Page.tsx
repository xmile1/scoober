import { Header, Footer } from "@/common/components";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  overflow: hidden;
`;

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageWrapper>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </PageWrapper>
  );
};
