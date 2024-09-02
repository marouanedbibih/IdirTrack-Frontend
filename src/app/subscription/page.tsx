"use client";

import { SubscriptionHeader } from "@/subscription/components/SubscriptionHeader";
import { SubscriptionsTable } from "@/subscription/components/SubscriptionsTable";
import { SubscripitonStatistiques } from "@/subscription/components/SubscriptionStatistiques";
import { SubscriptionProvider } from "@/subscription/contexts/SubscriptionProvider";
import { Card } from "@material-tailwind/react";

const SubscriptionPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-8 ">
      <SubscriptionProvider>
        <SubscripitonStatistiques />
        <Card
          className="w-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <SubscriptionHeader />
          <SubscriptionsTable />
        </Card>
      </SubscriptionProvider>
    </div>
  );
};

export default SubscriptionPage;
