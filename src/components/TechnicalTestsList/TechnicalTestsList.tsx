import React from "react";
import { TechnicalTestItem } from "../../modules/CompanyDashboard/models";
import TechnicalTestCard from "../TechnicalTestCard/TechnicalTestCard";

interface Props {
  technicalTests: TechnicalTestItem[];
  removeItem: any;
  inviteCandidate: any;
  showModal: any;
}

const TechnicalTestsList = ({
  technicalTests,
  removeItem,
  inviteCandidate,
  showModal,
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
            showModal={showModal}
          />
        );
      })}
    </>
  );
};

export default TechnicalTestsList;
