import { Mail, MapPin, Phone } from "lucide-react";

const adminEmail = "youradmin@example.com";

const contactItems = [
  {
    label: "Admin Email",
    value: adminEmail,
    href: `mailto:${adminEmail}`,
    icon: Mail,
  },
  {
    label: "Support Line",
    value: "+91 90000 00000",
    href: "tel:+919000000000",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Healthcare Support Desk, India",
    href: null,
    icon: MapPin,
  },
];

const Contact = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Contact Us
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Reach the Prescripto team when you need help or project details.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            For general questions, collaboration, or support, use the admin
            contact below. This page keeps your public contact information easy
            to find without requiring a login.
          </p>
        </div>

        <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Contact Information
          </h2>
          <div className="mt-8 space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-2 block text-lg font-medium text-slate-950 transition hover:text-emerald-700"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-lg font-medium text-slate-950">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
