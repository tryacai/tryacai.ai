"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Password from "./password";
import { Button } from "./button";
import { Logo } from "./Logo";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Please enter your name",
    })
    .min(1, "Please enter email"),
  email: z
    .string({
      required_error: "Please enter email",
    })
    .email("Please enter valid email")
    .min(1, "Please enter email"),
  phone: z
    .string({
      required_error: "Please enter your phone number",
    })
    .min(1, "Please enter your phone number"),
  company: z
    .string({
      required_error: "Please enter your company's name",
    })
    .min(1, "Please enter your company's name"),
  referred: z
    .enum(["yes", "no"], {
      required_error: "Please select if you were referred",
    }),
  referralSource: z
    .string()
    .optional(),
  message: z
    .string({
      required_error: "Please enter your message",
    })
    .min(1, "Please enter your message"),
});

export type LoginUser = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<LoginUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      referred: "no",
      referralSource: "",
      message: "",
    },
  });

  const [referred, setReferred] = useState<"yes" | "no">("no");

  async function onSubmit(values: LoginUser) {
    try {
      console.log("submitted form", values);
    } catch (e) {}
  }

  const socials = [
    {
      title: "twitter",
      href: "https://twitter.com/mannupaaji",
      icon: (
        <IconBrandX className="h-5 w-5 text-muted dark:text-muted-dark hover:text-black" />
      ),
    },
    {
      title: "linkedin",
      href: "https://www.linkedin.com/company/acai-ai",
      icon: (
        <IconBrandLinkedin className="h-5 w-5 text-muted dark:text-muted-dark hover:text-black" />
      ),
    },
    {
      title: "instagram",
      href: "https://www.instagram.com/tryacai.ai/?next=%2F&hl=en",
      icon: (
        <IconBrandInstagram className="h-5 w-5 text-muted dark:text-muted-dark hover:text-black" />
      ),
    },
  ];

  return (
    <Form {...form}>
      <div className="flex relative z-20 items-center w-full justify-center px-4 py-4 lg:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-muted dark:text-muted-dark  text-sm max-w-sm">
              Get started with ACAI. We're here to help.
            </p>
            <p className="mt-2 text-muted dark:text-muted-dark  text-sm max-w-sm">
              Have questions or need assistance? Our team is ready to help you with any inquiries you may have. Fill out the form below, and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="py-10">
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                      >
                        Full Name
                      </label>
                      <FormControl>
                        <div className="mt-2">
                          <input
                            id="name"
                            type="name"
                            placeholder=""
                            className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                      >
                        Email address
                      </label>
                      <FormControl>
                        <div className="mt-2">
                          <input
                            id="email"
                            type="email"
                            placeholder=""
                            className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                      >
                        Phone Number
                      </label>
                      <FormControl>
                        <div className="mt-2">
                          <input
                            id="phone"
                            type="tel"
                            placeholder=""
                            className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                    <FormItem>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                      >
                        Company
                      </label>
                      <FormControl>
                        <div className="mt-2">
                          <input
                            id="company"
                            type="company"
                            placeholder=""
                            className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referred"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark mb-3">
                        Did someone refer you to us?
                      </label>
                      <FormControl>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center">
                            <input
                              id="referred-yes"
                              type="radio"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => {
                                field.onChange(e.target.value as "yes" | "no");
                                setReferred("yes");
                              }}
                              className="w-4 h-4 text-blue-600 bg-white dark:bg-neutral-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 cursor-pointer"
                            />
                            <label htmlFor="referred-yes" className="ml-2 text-sm text-neutral-700 dark:text-muted-dark cursor-pointer">
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="referred-no"
                              type="radio"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => {
                                field.onChange(e.target.value as "yes" | "no");
                                setReferred("no");
                              }}
                              className="w-4 h-4 text-blue-600 bg-white dark:bg-neutral-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 cursor-pointer"
                            />
                            <label htmlFor="referred-no" className="ml-2 text-sm text-neutral-700 dark:text-muted-dark cursor-pointer">
                              No
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {referred === "no" && (
                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <label
                          htmlFor="referralSource"
                          className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                        >
                          Where did you find us?
                        </label>
                        <FormControl>
                          <div className="mt-2">
                            <input
                              id="referralSource"
                              type="text"
                              placeholder="Ex: Google, LinkedIn, word of mouth, etc."
                              className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                      >
                        Brief reason for message
                      </label>
                      <FormControl>
                        <div className="mt-2">
                          <textarea
                            rows={5}
                            id="message"
                            placeholder="Ex: interested in yearly plan, want to discuss more"
                            className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button className="w-full">Submit</Button>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Looking to see how ACAI works?
                </p>
                <Link href="/schedule-demo">
                  <Button variant="simple" className="w-full">
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 py-4">
            {socials.map((social) => (
              <Link href={social.href} key={social.title}>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Form>
  );
}
