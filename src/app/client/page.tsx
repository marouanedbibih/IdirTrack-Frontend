"use client";

import ClientCategoryForm from "@/client-category/components/ClientCategoryForm";
import ClientCategoryTable from "@/client-category/components/ClientCategoryTable";
import { ClientCategoryFunctionsProvider } from "@/client-category/contexts/ClientCategoryFunctionsProvider";
import { ClientCategoryProvider } from "@/client-category/contexts/ClientCategoryProvider";
import { ClientForm } from "@/client/components/ClientForm";
import ClientHeader from "@/client/components/ClientHeader";
import { ClientTable } from "@/client/components/ClientTable";
import { ClientProvider } from "@/client/contexts/ClientProvider";
import { Card } from "@material-tailwind/react";

const page: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto p-4 gap-4 ">
      <ClientProvider>
        <ClientCategoryProvider>
          <ClientCategoryFunctionsProvider>
            <ClientCategoryTable />
            <ClientCategoryForm />
            <Card
              className="w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ClientHeader />
              <ClientTable />
              <ClientForm />
            </Card>
          </ClientCategoryFunctionsProvider>
        </ClientCategoryProvider>
      </ClientProvider>
    </div>
  );
};

export default page;
