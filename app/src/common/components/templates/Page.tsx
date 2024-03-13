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

export const Page = ({ children, opponentName }: { children: React.ReactNode; opponentName: string }) => {
  return (
    <PageWrapper>
      <Header opponentName={opponentName} />
      <Main>
        {children}
      </Main>
      <Footer />
    </PageWrapper>
  );
};
