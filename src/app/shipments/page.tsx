import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ShipmentsTable from "@/app/shipments/ShipmentsTable";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Shipments Listing",
  description:
    "This is Next.js Shipments page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ShipmentsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Shipments Listing" />

      <div className="flex flex-col gap-10">
        <ShipmentsTable />
      </div>
    </DefaultLayout>
  );
};

export default ShipmentsPage;
