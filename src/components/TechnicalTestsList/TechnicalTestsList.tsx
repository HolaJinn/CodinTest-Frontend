import React from "react";
import { TechnicalTestItem } from "../../modules/CompanyDashboard/models";
import TechnicalTestCard from "../TechnicalTestCard/TechnicalTestCard";

interface Props {
  technicalTests: TechnicalTestItem[];
}

const TechnicalTestsList = ({ technicalTests }: Props) => {
  return (
    <>
      {technicalTests.map((technicalTest: TechnicalTestItem, index: number) => {
        return <TechnicalTestCard technicalTest={technicalTest} />;
      })}
    </>
  );
};

export default TechnicalTestsList;
