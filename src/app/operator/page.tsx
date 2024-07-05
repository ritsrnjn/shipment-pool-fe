import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OperatorTable from "@/app/operator/OperatorTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Operator",
  description:
    "This is Next.js Consolidations page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const OperatorPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pending Shipment Requests" />

      <div className="flex flex-col gap-10">
        <OperatorTable />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default OperatorPage;