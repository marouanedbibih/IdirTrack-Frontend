import { useBoitierContext } from "@/boitier/BoitierProvider";
import SelectWithSearch, { SelectableItem } from "@/components/form/SelectWithSearch";
import React, { useEffect, useState } from "react";
// import { useCreateVehicleContext } from "@/contexts/CreateVehicleProvider";
// import SelectWithSearch, { SelectableItem } from "../form/SelectWithSearch";

export interface DeviceItem extends SelectableItem {
  id: number;
  imei: string;
  type: string;
}

function DeviceSelect() {
  const {
    searchDeviceTerm,
    setSearchDeviceTerm,
    deviceBoitierList,
    fetchDeviceBoitierList,
    fetchDeviceSearched,
    currentDevicePage,
    setCurrentDevicePage,
    totalDevicePages,
    setTotalDevicePages,
    boitierRequest,
    setBoitierRequest,
    boitierErrors,
  } = useBoitierContext();

  const handleSelect = (item: DeviceItem) => {
    setBoitierRequest({
      ...boitierRequest,
      deviceMicroserviceId: item.id,
      imei: item.imei,
      deviceType: item.type,
    });
  };

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (boitierErrors.device != null) {
      setError(boitierErrors.device);
    } else {
      setError(null);
    }
  }, [boitierErrors.device]);


  return (
    <SelectWithSearch<DeviceItem>
      label="Device"
      searchTerm={searchDeviceTerm}
      setSearchTerm={setSearchDeviceTerm}
      fetchItems={fetchDeviceBoitierList}
      fetchSearchedItems={fetchDeviceSearched}
      items={deviceBoitierList.map((device) => ({
        id: device.deviceMicroserviceId,
        imei: device.imei,
        type: device.type,
      }))}
      currentPage={currentDevicePage}
      totalPage={totalDevicePages}
      setCurrentPage={setCurrentDevicePage}
      setTotalPage={setTotalDevicePages}
      selectedValue={boitierRequest.deviceMicroserviceId}
      setSelectedValue={(val) =>
        setBoitierRequest({ ...boitierRequest, deviceMicroserviceId: val })
      }
      setSelectedItem={handleSelect}
      keys={["imei", "type"]}
      error={error}
    />
  );
}

export default DeviceSelect;
