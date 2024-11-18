"use client"

import { CategoryType } from "@/types/category";
import { CATEGORY } from "@/utils/enums/category";
import { editCategoryAction } from "@/actions/categoryAction"; 
import { CategorySchema } from "@/schema/category.schema";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver} from "@hookform/resolvers/zod"

import Input from "@/components/Inputs/Input";
import { Toast } from "@/components/Toast/Toast";

type EditCategoryFormData = z.infer<typeof CategorySchema>;

export default function CreateCategoryUI({
    categories
} : {
    categories: CategoryType[]
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const [category, setCategory] = useState<CategoryType | null>(null);
    const params = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EditCategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            title: categories.find((category) => category.id == params.id)?.title ?? "",
            description: categories.find((category) => category.id == params.id)?.description ?? "",
            slug: categories.find((category) => category.id == params.id)?.slug ?? "",
        }
    });

    const onSubmit = async (data: EditCategoryFormData): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await editCategoryAction(
                data.title,
                data.description,
                data.slug,
            );
            if (response.error?.message) {
                Toast(response.error?.message, "error");
            } else {
                Toast(CATEGORY.EDIT_SUCCESS, "success");
                router.push("/");
            }
            reset();
        } catch (error) {
            Toast(
                error instanceof Error ? error.message : CATEGORY.EDIT_FAILED,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCategory(categories.find((category) => category.id == params.id) ?? null)
    }, [params.id])

    if (!category) {
        return null
    }

    console.log(category)

    return (
        <div className="flex justify-center w-full h-full bg-slate-300">
            <div className="flex flex-col w-full max-w-4xl h-auto m-16 p-6 space-y-4 rounded-lg bg-slate-100 shadow-xl">
                <h2 className="text-3xl font-semibold text-black">Edit Category</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <Input
                        type="text"
                        label="Title"
                        placeholder="Enter Title...."
                        error={errors.title}
                        {...register("title")}
                        labelClassName="text-xl text-black font-semibold"
                    />
                    <Input
                        type="text"
                        label="Description"
                        placeholder="Enter Description...."
                        error={errors.description}
                        {...register("description")}
                        labelClassName="text-xl text-black font-semibold"
                    />
                    <Input
                        type="text"
                        label="Slug"
                        placeholder="Enter Slug...."
                        error={errors.slug}
                        {...register("slug")}
                        labelClassName="text-xl text-black font-semibold"
                    />
                </form>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                    >
                        {isLoading ? "Loading..." : "Edit Category"}
                    </button>
                </div>
            </div>
        </div>
    );
}