import React from "react";
import { TechnicalTestItem } from "../../modules/CompanyDashboard/models";
import TechnicalTestCard from "../TechnicalTestCard/TechnicalTestCard";

interface Props {
  technicalTests: TechnicalTestItem[];
  removeItem: any;
  inviteCandidate: any;
}

const TechnicalTestsList = ({
  technicalTests,
  removeItem,
  inviteCandidate,
}: Props) => {
  return (
    <>
      {technicalTests.map((technicalTest: TechnicalTestItem, index: number) => {
        return (
          <TechnicalTestCard
            key={index}
            technicalTest={technicalTest}
            removeItem={removeItem}
            inviteCandidate={inviteCandidate}
          />
        );
      })}
    </>
  );
};

export default TechnicalTestsList;
