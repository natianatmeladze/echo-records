import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import Button from "../components/Button";

const contactSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  subject: yup
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),
  message: yup
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-zinc-800 pb-8"
        >
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
            CONTACT US
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Have a question about a pressing, order, or rare vinyl request? Reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6 text-sm text-zinc-400"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium uppercase text-xs tracking-wider mb-1">
                  Record Store & Studio
                </h3>
                <p>42 Rustaveli Avenue, Tbilisi, Georgia</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium uppercase text-xs tracking-wider mb-1">
                  Email
                </h3>
                <p>hello@echorecords.ge</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium uppercase text-xs tracking-wider mb-1">
                  Phone
                </h3>
                <p>+995 555 12 34 56</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="py-12 flex flex-col items-start gap-4">
                <div className="p-3 rounded-full bg-[#8B0000]/20 text-[#8B0000]">
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-normal uppercase tracking-tight">
                  Message Sent
                </h2>
                <p className="text-xs text-zinc-400">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button
                  text="Send Another Message"
                  bg="bg-white hover:bg-zinc-200"
                  textColor="text-black text-xs font-semibold py-2.5 px-6"
                  onClick={() => setSubmitted(false)}
                />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.name
                        ? "border-red-600"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-600"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Vinyl inquiry / Order status"
                    {...register("subject")}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.subject
                        ? "border-red-600"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-500">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    {...register("message")}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? "border-red-600"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#8B0000] hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;