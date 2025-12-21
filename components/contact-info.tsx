import React from "react";
import { Container } from "./container";

export const ContactInfo = () => {
  const contacts = [
    { name: "Adam", phone: "(732) 895-7895" },
    { name: "Cristian", phone: "(732) 890-3121" },
    { name: "Chris", phone: "(848) 253-9552" },
  ];

  return (
    <section className="py-20 w-full relative z-30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-8">
            Get in Touch
          </h2>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className="flex items-center justify-center gap-3 text-base md:text-lg text-neutral-700 dark:text-neutral-300"
              >
                <span className="font-medium">{contact.name}</span>
                <span className="text-neutral-400 dark:text-neutral-600">—</span>
                <span>{contact.phone}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
