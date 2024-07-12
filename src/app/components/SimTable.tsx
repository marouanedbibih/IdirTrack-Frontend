"use client";

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

interface Sim {
    id?: number;
    pin: string;
    puk: string;
    ccid: string;
    operatorType: string;
    status: string;
    phoneNumber: string;
    addDate: string; // Changed to string to match datetime-local input type
}

const SimTable: React.FC = () => {
    const [sims, setSims] = useState<Sim[]>([]);
    const [newSim, setNewSim] = useState<Sim>({
        pin: '',
        puk: '',
        ccid: '',
        operatorType: '',
        status: '',
        phoneNumber: '',
        addDate: '' // Initialize as empty string
    });
    const [editSimId, setEditSimId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSims();
    }, []);

    const fetchSims = async () => {
        try {
            const response = await axiosInstance.get('/sims');
            setSims(response.data);
        } catch (error) {
            console.error('Error fetching sims:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSim({ ...newSim, [name]: value });
    };

    const handleAddSim = async () => {
        try {
            const response = await axiosInstance.post('/sims', newSim);
            setSims([...sims, response.data]);
            setShowModal(false);
            setNewSim({
                pin: '',
                puk: '',
                ccid: '',
                operatorType: '',
                status: '',
                phoneNumber: '',
                addDate: '' // Reset after adding
            });
        } catch (error) {
            console.error('Error adding sim:', error);
        }
    };

    const handleDeleteSim = async (id: number) => {
        try {
            await axiosInstance.delete(`/sims/${id}`);
            setSims(sims.filter(sim => sim.id !== id));
        } catch (error) {
            console.error('Error deleting sim:', error);
        }
    };

    const handleEditSim = (sim: Sim) => {
        setEditSimId(sim.id || null);
        setNewSim(sim);
        setShowModal(true);
    };

    const handleUpdateSim = async () => {
        if (editSimId === null) return;
        try {
            const response = await axiosInstance.put(`/sims/${editSimId}`, newSim);
            setSims(sims.map(sim => (sim.id === editSimId ? response.data : sim)));
            setEditSimId(null);
            setShowModal(false);
            setNewSim({
                pin: '',
                puk: '',
                ccid: '',
                operatorType: '',
                status: '',
                phoneNumber: '',
                addDate: '' // Reset after updating
            });
        } catch (error) {
            console.error('Error updating sim:', error);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredSims = sims.filter(sim => 
        Object.values(sim).some(val => 
            val && val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">SIM Table</h1>
            <div className="flex justify-between mb-4">
                <input 
                    type="text"
                    placeholder="Search SIMs"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2 rounded"
                />
                <button 
                    onClick={() => {
                        setEditSimId(null);
                        setNewSim({
                            pin: '',
                            puk: '',
                            ccid: '',
                            operatorType: '',
                            status: '',
                            phoneNumber: '',
                            addDate: '' // Reset when opening the modal
                        });
                        setShowModal(true);
                    }} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New SIM
                </button>
            </div>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Pin</th>
                        <th className="py-2">Puk</th>
                        <th className="py-2">CCID</th>
                        <th className="py-2">Operator Type</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Phone Number</th>
                        <th className="py-2">Add Date</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSims.map(sim => (
                        <tr key={sim.id}>
                            <td className="border px-4 py-2">{sim.id}</td>
                            <td className="border px-4 py-2">{sim.pin}</td>
                            <td className="border px-4 py-2">{sim.puk}</td>
                            <td className="border px-4 py-2">{sim.ccid}</td>
                            <td className="border px-4 py-2">{sim.operatorType}</td>
                            <td className="border px-4 py-2">{sim.status}</td>
                            <td className="border px-4 py-2">{sim.phoneNumber}</td>
                            <td className="border px-4 py-2">{sim.addDate}</td>
                            <td className="border px-4 py-2 flex space-x-2">
                                <button onClick={() => handleEditSim(sim)} className="text-blue-500">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDeleteSim(sim.id!)} className="text-red-500">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-1/3">
                        <h2 className="text-xl font-bold mb-4">{editSimId ? 'Edit SIM' : 'Add New SIM'}</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Pin</label>
                            <input
                                type="text"
                                name="pin"
                                value={newSim.pin}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Puk</label>
                            <input
                                type="text"
                                name="puk"
                                value={newSim.puk}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">CCID</label>
                            <input
                                type="text"
                                name="ccid"
                                value={newSim.ccid}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Operator Type</label>
                            <input
                                type="text"
                                name="operatorType"
                                value={newSim.operatorType}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Status</label>
                            <input
                                type="text"
                                name="status"
                                value={newSim.status}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={newSim.phoneNumber}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Add Date</label>
                            <input
                                type="datetime-local"
                                name="addDate"
                                value={newSim.addDate}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            <button onClick={editSimId ? handleUpdateSim : handleAddSim} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimTable;
