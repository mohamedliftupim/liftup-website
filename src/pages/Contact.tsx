import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Briefcase, Users, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type PurposeId = "work" | "join" | "question";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const Contact = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  const [purpose, setPurpose] = useState<PurposeId | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const purposes = useMemo(
    () => [
      { id: "work" as const, label: t("contact.form.workWithUs"), icon: Briefcase, description: t("contact.form.workWithUsDesc") },
      { id: "join" as const, label: t("contact.form.joinTeam"), icon: Users, description: t("contact.form.joinTeamDesc") },
      { id: "question" as const, label: t("contact.form.askQuestion"), icon: HelpCircle, description: t("contact.form.askQuestionDesc") },
    ],
    [t]
  );

  const contactInfo = useMemo(
    () => [
      {
        icon: <Mail className="w-6 h-6" />,
        title: t("contact.info.email"),
        info: "admin@liftupim.com",
        link: "mailto:admin@liftupim.com",
      },
      {
        icon: <Phone className="w-6 h-6" />,
        title: t("contact.info.call"),
        info: "+20 100 039 3502",
        link: "tel:+201000393502",
      },
      {
        icon: <MapPin className="w-6 h-6" />,
        title: t("contact.info.visit"),
        info: "Ryhana Plaza Building, B Tower, Zahraa Maadi, Cairo",
        link: "https://maps.app.goo.gl/EqucqSx2krsJDySX9",
      },
      {
        icon: <MessageCircle className="w-6 h-6" />,
        title: t("contact.info.whatsapp"),
        info: t("contact.info.chatWithUs"),
        link: "https://wa.me/201000393502",
      },
    ],
    [t]
  );

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  const functionUrl = supabaseUrl ? `${supabaseUrl}/functions/v1/send-contact-email` : "";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!purpose) {
      toast({
        title: t("contact.form.selectPurpose"),
        description: t("contact.form.selectPurposeDesc"),
        variant: "destructive",
      });
      return;
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      toast({
        title: "Missing Supabase env",
        description: "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local ثم اعمل restart للسيرفر.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ ...formData, purpose }),
      });

      let json: any = null;
      try {
        json = await res.json();
      } catch {
        // ignore JSON parse failure
      }

      // لو السيرفر رجع non-2xx
      if (!res.ok) {
        const msg =
          json?.error ||
          json?.message ||
          (typeof json === "string" ? json : null) ||
          `Request failed (${res.status})`;
        throw new Error(msg);
      }

      // لو كودك بيرجع {success:false}
      if (json?.success === false) {
        throw new Error(json?.error || "Failed to send message.");
      }

      toast({
        title: t("contact.form.success"),
        description: t("contact.form.successDesc"),
      });

      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", message: "" });
      setPurpose("");
    } catch (err: any) {
      console.error("Contact form submit error:", err);
      toast({
        title: "Error",
        description: err?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${isRTL ? "text-right" : ""}`}>
      {/* Hero Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6"
            >
              {t("contact.badge")}
            </motion.div>

            <h1 className="text-5xl md:text-7xl mb-6">
              {t("contact.title")}{" "}
              <span className="text-primary font-display font-normal">{t("contact.titleHighlight")}</span>
            </h1>

            <p className="text-xl text-muted-foreground">{t("contact.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h2 className="text-3xl mb-6">{t("contact.form.title")}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Purpose Selector */}
                  <div>
                    <label className="block text-sm font-medium mb-3">{t("contact.form.howHelp")}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {purposes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPurpose(item.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-center group ${
                            purpose === item.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50 bg-background"
                          }`}
                          aria-pressed={purpose === item.id}
                        >
                          <item.icon
                            className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                              purpose === item.id ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                            }`}
                          />
                          <p className={`text-sm font-medium ${purpose === item.id ? "text-accent" : "text-foreground"}`}>
                            {item.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("contact.form.firstName")}</label>
                      <Input
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("contact.form.lastName")}</label>
                      <Input
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.phone")}</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.company")}</label>
                    <Input
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                    <Textarea
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 glow-cyan text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : t("contact.form.submit")}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl mb-4">
                  {t("contact.info.title")}{" "}
                  <span className="text-primary font-display font-normal">{t("contact.info.titleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-8">{t("contact.info.subtitle")}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-xl hover:border-accent/50 transition-all duration-300 group cursor-pointer">
                      <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="text-accent group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div>
                          <h3 className="mb-1 text-left">{item.title}</h3>
                          <p className="text-muted-foreground">{item.info}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>

              {/* Office Hours */}
              <Card className="p-6 bg-secondary">
                <h3 className="mb-4 text-primary">{t("contact.office.title")}</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span>{t("contact.office.sunThur")}</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span>{t("contact.office.saturday")}</span>
                    <span>{t("contact.office.closed")}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span>{t("contact.office.friday")}</span>
                    <span>{t("contact.office.closed")}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
