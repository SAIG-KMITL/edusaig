"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/Inputs/Input";

export default function UserBackgroundFormUI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [opportunity, setOpportunity] = useState<string>("");
    const [blocks, setBlocks] = useState<string[]>([""]);

    const handleAddBlock = () => {
        setBlocks([...blocks, ""]);
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = value;
        setBlocks(updatedBlocks);
    };

    const handleDeleteBlock = (index: number) => {
        const updatedBlocks = blocks.filter((_, i) => i !== index);
        setBlocks(updatedBlocks);
    };

    useEffect(() => {
        console.log(opportunity);
        console.log(blocks);
    }, [opportunity, blocks]);

    return (
        <form className="flex flex-col space-y-2 lg:space-y-4 container my-4 lg:my-8 mx-auto p-4 lg:p-8 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md">
            <h2 className="text-4xl font-semibold text-slate-50">Create Your Background</h2>
            <Input
                type="text"
                label="What do you want to be?"
                placeholder="Enter your desired role"
                value={opportunity}
                onChange={(e) => setOpportunity(e.target.value)}
                labelClassName="text-xl text-slate-50 font-semibold"
                className="bg-slate-50"
            />
            <div className="flex justify-between items-center w-full">
                <h2 className="text-xl text-slate-50 font-semibold">What knowledge do you have?</h2>
                <button
                    type="button"
                    onClick={handleAddBlock}
                    className="w-fit bg-blue-500 px-4 py-2 rounded-xl font-semibold text-white hover:bg-blue-700 transition"
                >
                    Add Skill +
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blocks.map((block, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 p-4 bg-slate-200 rounded-xl shadow-md relative"
                    >
                        <Input
                            type="text"
                            label={`Skill ${index + 1}`}
                            placeholder="Enter Skill"
                            value={block}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            labelClassName="text-xl font-semibold"
                            className="bg-white w-full"
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteBlock(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-700 transition"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <button className="flex justify-center items-center w-full p-2 bg-blue-500 rounded-xl text-xl font-semibold">
                Confirm
            </button>
        </form>
    );
}
