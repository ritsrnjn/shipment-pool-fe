import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ConsolidationsTable from "@/app/consolidations/ConsolidationsTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Consolidations",
  description:
    "This is Next.js Consolidations page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ConsolidationsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Consolidations Listing" />

      <div className="flex flex-col gap-10">
        <ConsolidationsTable />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default ConsolidationsPage;