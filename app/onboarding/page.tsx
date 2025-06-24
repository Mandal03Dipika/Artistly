"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import CheckBoxGroup from "@/components/forms/CheckBoxGroup";
import SelectInput from "@/components/forms/SelectInput";
import { useOptions } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  profileImage: yup.mixed().notRequired(),
});

interface FormField {
  type: string;
  component: React.ComponentType<any>;
  label: string;
  name: string;
  options?: string[];
  error?: string;
}

export default function OnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitted, setSubmitted] = useState(false);
  const { categoryOptions, languageOptions, feeOptions } = useOptions();

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    setSubmitted(true);
    reset();
  };

  const formConfig: FormField[] = [
    {
      type: "text",
      component: TextInput,
      label: "Name",
      name: "name",
      error: errors.name?.message,
    },
    {
      type: "textarea",
      component: TextArea,
      label: "Bio",
      name: "bio",
      error: errors.bio?.message,
    },
    {
      type: "checkbox",
      component: CheckBoxGroup,
      label: "Category",
      name: "category",
      options: categoryOptions,
      error: errors.category?.message,
    },
    {
      type: "checkbox",
      component: CheckBoxGroup,
      label: "Languages Spoken",
      name: "languages",
      options: languageOptions,
      error: errors.languages?.message,
    },
    {
      type: "select",
      component: SelectInput,
      label: "Fee Range",
      name: "feeRange",
      options: feeOptions,
      error: errors.feeRange?.message,
    },
    {
      type: "text",
      component: TextInput,
      label: "Location",
      name: "location",
      error: errors.location?.message,
    },
  ];

  return (
    <motion.div
      className="flex justify-center px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl border shadow-md dark:border-gray-700 dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Artist Onboarding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {formConfig.map(({ component: Component, ...field }) => (
              <motion.div
                key={field.name}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Component
                  label={field.label}
                  name={field.name}
                  options={field.options}
                  register={register}
                  error={field.error}
                />
              </motion.div>
            ))}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2"
            >
              <Label htmlFor="profileImage">Profile Image (optional)</Label>
              <Input
                type="file"
                id="profileImage"
                accept="image/*"
                {...register("profileImage")}
                className="cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700 dark:file:bg-purple-700 dark:hover:file:bg-purple-600"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Submit
              </Button>
            </motion.div>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm font-medium text-green-600 dark:text-green-400"
              >
                Form submitted successfully!
              </motion.p>
            )}
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
