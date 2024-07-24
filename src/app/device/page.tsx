"use client";
import { DeviceForm } from '@/device/components/DeviceForm';
import { DeviceTable } from '@/device/components/DeviceTable';
import { useDeviceContext} from '@/device/contexts/DeviceProvider';
import React from 'react';

const DeviceHome: React.FC = () => {
    const {isCreateDeviceModalOpen} = useDeviceContext();
    return (
        <div className="flex flex-col justify-center items-center mx-auto p-4 ">
            <DeviceTable />
            {
                isCreateDeviceModalOpen && <DeviceForm />
            }
        </div>
    );
};

export default DeviceHome;
