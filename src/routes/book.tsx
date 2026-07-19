import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  User, Mail, Phone, MessageCircle, Calendar, MapPin, IndianRupee,
  Package, Users, Sparkles, MessageSquare, Check, ArrowLeft, ArrowRight, Heart,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Logo } from "@/components/site/Logo";
import { bookingSchema as schema, type BookingFormState as FormState } from "@/lib/booking-schema";
import { submitBooking } from "@/actions/booking";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Story — Frames to Forever" },
      { name: "description", content: "Reserve your date with Frames to Forever. Share the details of your event and receive a personalised proposal from Fraz Saifi." },
      { property: "og:title", content: "Book Your Story — Frames to Forever" },
      { property: "og:description", content: "Reserve your date with Frames to Forever by Fraz Saifi." },
    ],
  }),
  component: BookPage,
});

const initial: FormState = {
  fullName: "", email: "", phone: "", whatsapp: "",
  eventType: "", eventDate: "", location: "", budget: "",
  packageChoice: "", guests: "", addons: [], message: "",
  contactMethod: "WhatsApp", terms: false, honeypot: "",
};

const eventTypes = ["Wedding","Pre-Wedding","Engagement","Haldi","Mehendi","Reception","Portrait","Maternity","Baby","Birthday","Fashion","Corporate","Product","Other"];
const budgets = ["Under ₹25,000","₹25,000 – ₹50,000","₹50,000 – ₹1,00,000","₹1,00,000 – ₹2,50,000","₹2,50,000+"];
const packageOptions = ["Basic — ₹15,000","Standard — ₹25,000","Premium — ₹40,000","Custom"];
const addonList = ["Cinematic Film","Drone Coverage","Second Photographer","Photo Album","Same-Day Highlights","Traditional Prints"];

const steps = [
  { label: "You" },
  { label: "Event" },
  { label: "Details" },
  { label: "Review" },
];

function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleAddon = (a: string) =>
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(a) ? f.addons.filter((x) => x !== a) : [...f.addons, a],
    }));

  const validateStep = (): boolean => {
    const partial: (keyof FormState)[][] = [
      ["fullName","email","phone"],
      ["eventType","eventDate","location"],
      ["budget","packageChoice"],
      ["terms"],
    ];
    const keys = partial[step];
    const res = schema.safeParse(form);
    const errs: Record<string,string> = {};
    if (!res.success) {
      for (const issue of res.error.issues) {
        const k = issue.path[0] as string;
        if (keys.includes(k as keyof FormState)) errs[k] = issue.message;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string,string> = {};
      for (const issue of res.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      toast.error("Please review the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitBooking({ data: form });
      if (response.success) {
        setSubmitted(true);
      } else {
        toast.error(response.message || "Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-warm min-h-screen">
        <Nav />
        <section className="pt-40 pb-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto h-20 w-20 rounded-full bg-gold grid place-items-center shadow-luxury">
              <Check className="h-8 w-8 text-ink" strokeWidth={2} />
            </div>
            <p className="eyebrow mt-8">Thank You</p>
            <h1 className="font-display mt-4 text-5xl md:text-6xl text-ink text-balance leading-[1.05]">
              Your story is <span className="italic font-serif">reserved</span>.
            </h1>
            <p className="mt-6 text-coffee leading-relaxed">
              A confirmation has been sent to <span className="text-ink">{form.email}</span>.
              Fraz will personally reach out within 24 hours to walk you through the next steps.
            </p>
            <p className="font-script text-4xl text-coffee mt-8">Until soon —</p>
            <Link to="/" className="btn-luxury mt-10">Return home</Link>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-warm min-h-screen grain">
      <Nav />
      <section className="pt-32 md:pt-40 pb-24 px-4 md:px-6 relative">
        {/* Ambient decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute bottom-40 -right-24 h-96 w-96 rounded-full bg-champagne/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <Logo className="mx-auto h-16 w-auto" />
            <p className="eyebrow mt-6">The Reservation</p>
            <h1 className="font-display mt-4 text-5xl md:text-7xl text-ink text-balance leading-[1.02]">
              Book your <span className="italic font-serif">story</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-coffee">
              Share the details of your day. Every enquiry is read personally by Fraz — we typically reply within 24 hours.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-12 flex items-center justify-center gap-2 md:gap-4">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 md:gap-4">
                <div className={`flex items-center gap-2 transition-opacity ${i === step ? "opacity-100" : "opacity-50"}`}>
                  <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-medium transition-all ${
                    i < step ? "bg-gold text-ink" : i === step ? "bg-ink text-ivory shadow-soft" : "bg-cream text-coffee border border-border"
                  }`}>
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className="hidden md:block eyebrow">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`h-px w-8 md:w-16 transition-colors ${i < step ? "bg-gold" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {/* Glassmorphism form */}
          <form onSubmit={submit} className="mt-12">
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) => update("honeypot", e.target.value)}
            />
            <div className="relative rounded-3xl border border-white/60 bg-ivory/70 backdrop-blur-2xl shadow-luxury p-6 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field icon={User}  label="Full Name"       value={form.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
                      <Field icon={Mail}  label="Email Address"   type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
                      <Field icon={Phone} label="Phone Number"    type="tel" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
                      <Field icon={MessageCircle} label="WhatsApp (optional)" type="tel" value={form.whatsapp} onChange={(v) => update("whatsapp", v)} error={errors.whatsapp} />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <SelectField icon={Heart} label="Event Type" value={form.eventType} onChange={(v) => update("eventType", v)} options={eventTypes} error={errors.eventType} />
                      <Field icon={Calendar} label="Preferred Date" type="date" value={form.eventDate} onChange={(v) => update("eventDate", v)} error={errors.eventDate} />
                      <div className="md:col-span-2">
                        <Field icon={MapPin} label="Location / Venue" value={form.location} onChange={(v) => update("location", v)} error={errors.location} />
                      </div>
                      <Field icon={Users} label="Approximate Guests (optional)" type="number" value={form.guests} onChange={(v) => update("guests", v)} error={errors.guests} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <SelectField icon={IndianRupee} label="Budget" value={form.budget} onChange={(v) => update("budget", v)} options={budgets} error={errors.budget} />
                        <SelectField icon={Package} label="Package" value={form.packageChoice} onChange={(v) => update("packageChoice", v)} options={packageOptions} error={errors.packageChoice} />
                      </div>

                      <div>
                        <p className="eyebrow mb-3 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5"/> Additional Services</p>
                        <div className="flex flex-wrap gap-2">
                          {addonList.map((a) => {
                            const on = form.addons.includes(a);
                            return (
                              <button
                                type="button"
                                key={a}
                                onClick={() => toggleAddon(a)}
                                className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
                                  on
                                    ? "bg-ink text-ivory shadow-soft"
                                    : "bg-transparent border border-border text-chocolate hover:border-ink"
                                }`}
                              >
                                {on && <Check className="inline h-3 w-3 mr-1" />}
                                {a}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <TextArea icon={MessageSquare} label="Tell us about your story (optional)" value={form.message} onChange={(v) => update("message", v)} error={errors.message} />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-8">
                      <div>
                        <p className="eyebrow">Preferred Contact Method</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(["WhatsApp","Email","Phone"] as const).map((m) => (
                            <button
                              type="button"
                              key={m}
                              onClick={() => update("contactMethod", m)}
                              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.24em] uppercase transition ${
                                form.contactMethod === m ? "bg-ink text-ivory" : "border border-border text-chocolate hover:border-ink"
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-cream/60 p-5 md:p-6 text-sm text-chocolate space-y-2">
                        <Summary label="Name" value={form.fullName} />
                        <Summary label="Contact" value={`${form.email} · ${form.phone}`} />
                        <Summary label="Event" value={`${form.eventType || "—"} · ${form.eventDate || "—"}`} />
                        <Summary label="Location" value={form.location} />
                        <Summary label="Package" value={`${form.packageChoice || "—"} · ${form.budget || "—"}`} />
                        {form.addons.length > 0 && <Summary label="Add-ons" value={form.addons.join(", ")} />}
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.terms}
                          onChange={(e) => update("terms", e.target.checked)}
                          className="mt-1 h-4 w-4 accent-ink"
                        />
                        <span className="text-sm text-coffee">
                          I agree to be contacted about my enquiry and accept the studio’s{" "}
                          <a href="#" className="text-ink underline underline-offset-4">terms & privacy</a>.
                        </span>
                      </label>
                      {errors.terms && <p className="text-xs text-destructive -mt-4">{errors.terms}</p>}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Nav */}
              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className={`btn-ghost disabled:opacity-30 disabled:pointer-events-none`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                {step < steps.length - 1 ? (
                  <button type="button" onClick={next} className="btn-luxury">
                    Continue <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="btn-luxury !bg-gold !text-ink hover:!bg-champagne disabled:opacity-50 disabled:pointer-events-none">
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}

/* --- Field primitives --- */

function Field({
  icon: Icon, label, value, onChange, type = "text", error,
}: {
  icon: React.ElementType; label: string; value: string;
  onChange: (v: string) => void; type?: string; error?: string;
}) {
  const filled = value.length > 0;
  return (
    <label className="block">
      <div className={`relative rounded-lg border transition-all bg-ivory/60 ${
        error ? "border-destructive" : "border-border focus-within:border-ink"
      }`}>
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee" strokeWidth={1.4} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="peer w-full bg-transparent pl-11 pr-4 pt-6 pb-2 text-ink text-sm focus:outline-none"
        />
        <span className={`pointer-events-none absolute left-11 transition-all text-coffee ${
          filled ? "top-1.5 text-[10px] tracking-[0.28em] uppercase" : "top-1/2 -translate-y-1/2 text-sm"
        } peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:tracking-[0.28em] peer-focus:uppercase`}>
          {label}
        </span>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function SelectField({
  icon: Icon, label, value, onChange, options, error,
}: {
  icon: React.ElementType; label: string; value: string;
  onChange: (v: string) => void; options: string[]; error?: string;
}) {
  return (
    <label className="block">
      <div className={`relative rounded-lg border transition-all bg-ivory/60 ${
        error ? "border-destructive" : "border-border focus-within:border-ink"
      }`}>
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee" strokeWidth={1.4} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pl-11 pr-8 pt-6 pb-2 text-ink text-sm focus:outline-none"
        >
          <option value="" disabled></option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className={`pointer-events-none absolute left-11 transition-all text-coffee ${
          value ? "top-1.5 text-[10px] tracking-[0.28em] uppercase" : "top-1/2 -translate-y-1/2 text-sm"
        }`}>{label}</span>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-coffee" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function TextArea({
  icon: Icon, label, value, onChange, error,
}: {
  icon: React.ElementType; label: string; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <label className="block">
      <div className={`relative rounded-lg border transition-all bg-ivory/60 ${
        error ? "border-destructive" : "border-border focus-within:border-ink"
      }`}>
        <Icon className="absolute left-4 top-5 h-4 w-4 text-coffee" strokeWidth={1.4} />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder=" "
          className="peer w-full bg-transparent pl-11 pr-4 pt-6 pb-3 text-ink text-sm focus:outline-none resize-none"
        />
        <span className={`pointer-events-none absolute left-11 transition-all text-coffee ${
          value ? "top-1.5 text-[10px] tracking-[0.28em] uppercase" : "top-5 text-sm"
        } peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:tracking-[0.28em] peer-focus:uppercase`}>
          {label}
        </span>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="eyebrow w-24 shrink-0">{label}</span>
      <span className="text-ink">{value || "—"}</span>
    </div>
  );
}
