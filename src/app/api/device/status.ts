// pages/api/device/status.ts
import { DeviceStatus } from '@/device/types/DeviceType';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Send the device status enum
    res.status(200).json({ status: DeviceStatus });
}
