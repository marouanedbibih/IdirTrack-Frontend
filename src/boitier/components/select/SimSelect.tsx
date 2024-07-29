import { useBoitierContext } from "@/boitier/BoitierProvider";
import SelectWithSearch, { SelectableItem } from "@/components/form/SelectWithSearch";
import React, { useEffect, useState } from "react";


export interface SimItem extends SelectableItem {
  id: number;
  phone: string;
  ccid: string;
  operatorName: string;
}

function SimSelect() {
  const {
    searchSimTerm,
    setSearchSimTerm,
    simBoitierList,
    fetchSimBoitierList,
    fetchSimBoitierListSearched,
    currentSimPage,
    setCurrentSimPage,
    totalSimPages,
    setTotalSimPages,
    boitierRequest,
    setBoitierRequest,
    boitierErrors,
  } = useBoitierContext();

  const handleSelect = (item: SimItem) => {
    setBoitierRequest({
      ...boitierRequest,
      simMicroserviceId: item.id,
      ccid: item.ccid,
      phone: item.phone,
      operatorName: item.operatorName,
    });
  };

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (boitierErrors.device != null) {
      setError(boitierErrors.sim);
    } else {
      setError(null);
    }
  }, [boitierErrors.device]);

  // use effect to handle fetching


  return (
    <SelectWithSearch<SimItem>
      label="Sim"
      searchTerm={searchSimTerm}
      setSearchTerm={setSearchSimTerm}
      fetchItems={fetchSimBoitierList}
      fetchSearchedItems={fetchSimBoitierListSearched}
      items={simBoitierList.map((sim) => ({
        id: sim.simMicroserviceId,
        phone: sim.phone,
        operatorName: sim.operatorName,
        ccid: sim.ccid,
      }))}
      currentPage={currentSimPage}
      totalPage={totalSimPages}
      setCurrentPage={setCurrentSimPage}
      setTotalPage={setTotalSimPages}
      selectedValue={boitierRequest.simMicroserviceId}
      setSelectedValue={(val) =>
        setBoitierRequest({ ...boitierRequest, simMicroserviceId: val })
      }
      setSelectedItem={handleSelect}
      keys={["phone", "operatorName", "ccid"]}
      error={error}
    />
  );
}

export default SimSelect;
