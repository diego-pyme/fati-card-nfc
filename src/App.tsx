import type { ComponentType, SVGProps } from "react";
import {
  ArrowUpRight,
  Download,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Badge, Heading, Text } from "@radix-ui/themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CardMode = "default" | "static";

type SocialLink = {
  label: string;
  description: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
  placeholder?: boolean;
};

const pills = ["Clientes", "Servicios", "Proveedores"];
const whatsappHref =
  "https://wa.me/56940017720?text=Hola%20Fati%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20la%20app.";

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.35" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.25 19v-5.55h2.2l.35-2.65h-2.55V9.15c0-.77.22-1.29 1.31-1.29h1.4V5.54c-.24-.03-1.08-.1-2.04-.1-2.02 0-3.41 1.23-3.41 3.5v1.86H8.5v2.65h2.31V19h2.44Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    description: "Marca y novedades.",
    href: "https://www.instagram.com/fatiapp_/",
    icon: InstagramGlyph,
  },
  {
    label: "Facebook",
    description: "Comunidad Fati.",
    href: "https://www.facebook.com/profile.php?id=61579667966882",
    icon: FacebookGlyph,
  },
  {
    label: "Descargar",
    description: "Proximamente.",
    icon: Download,
    placeholder: true,
  },
];

function getCardMode(): CardMode {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  return pathname === "/full" ? "default" : "static";
}

function FatiCard({ mode }: { mode: CardMode }) {
  const isStatic = mode === "static";

  return (
    <section
      className={cn("fati-card w-full", isStatic && "p-[18px] rounded-[32px]")}
      data-export-root={isStatic ? "card-static" : undefined}
    >
      <div className={cn(isStatic ? "space-y-4" : "space-y-5")}>
        <header className={cn("flex items-center gap-4", isStatic && "gap-3")}>
          <div className={cn("brand-plate", isStatic && "rounded-[22px] px-3 py-2.5")}>
            <div className={cn("logo-plate", isStatic && "h-[52px] w-[52px] rounded-[16px] p-[9px]")}>
              <img
                src="/logo_fati.png"
                alt="Logo Fati"
                className={cn(
                  "object-contain",
                  isStatic ? "h-[34px] w-[34px]" : "h-10 w-10",
                )}
              />
            </div>

            <div className="min-w-0">
              <Text as="p" className="section-kicker">
                Fati Card
              </Text>
              <Heading
                as="h2"
                size="4"
                className={cn(
                  "tracking-[0.28em] text-white",
                  isStatic && "text-[1rem] tracking-[0.26em]",
                )}
              >
                FATI
              </Heading>
            </div>
          </div>
        </header>

        <section className={cn("px-1", isStatic ? "space-y-3" : "space-y-4")}>
          <div className={cn(isStatic ? "space-y-2.5" : "space-y-3")}>
            <Heading
              as="h1"
              size="8"
              className={cn(
                "text-white",
                isStatic
                  ? "max-w-[13ch] text-[2.05rem] leading-[0.92] tracking-[-0.09em]"
                  : "max-w-[12ch] text-[2.35rem] leading-[0.94] tracking-[-0.085em] sm:text-[2.55rem]",
              )}
            >
              Descarga y descubre la experiencia{" "}
              <span className="brand-gradient-text">Fati.</span>
            </Heading>

            <Text
              as="p"
              className={cn(
                "text-white/58",
                isStatic
                  ? "max-w-[30ch] text-[0.88rem] leading-[1.45rem]"
                  : "max-w-[31ch] text-[0.96rem] leading-6",
              )}
            >
              El puente entre personas, necesidades y proveedores en una
              experiencia simple, elegante y cercana.
            </Text>
          </div>

          <div className={cn("identity-chip", isStatic && "px-3 py-1.5 text-[0.76rem]")}>
            <span className="identity-name">Diego Penaloza</span>
            <span className="identity-dot" aria-hidden="true" />
            <span className="identity-role">Fundador</span>
          </div>
        </section>

        <div className={cn("grid grid-cols-2 gap-3", isStatic && "gap-2.5")}>
          <a
            aria-disabled="true"
            tabIndex={-1}
            className={cn(
              buttonVariants({ variant: "primary" }),
              "pointer-events-none select-none",
              isStatic && "min-h-12 rounded-[18px] px-3 text-[0.86rem]",
            )}
          >
            <Download className="h-[18px] w-[18px]" />
            Descargar Fati
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              isStatic && "min-h-12 rounded-[18px] px-3 text-[0.86rem]",
            )}
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
        </div>

        <section className={cn("surface-card", isStatic ? "space-y-3 p-3.5" : "space-y-4")}>
          <div className={cn("flex items-start justify-between gap-4", isStatic && "gap-3")}>
            <div className={cn(isStatic ? "space-y-1.5" : "space-y-2")}>
              <Text as="p" className="section-kicker">
                Asi se vive Fati
              </Text>
              <Heading
                as="h3"
                size="6"
                className={cn(
                  "text-white",
                  isStatic
                    ? "text-[1.34rem] leading-[0.96] tracking-[-0.065em]"
                    : "text-[1.6rem] leading-[0.96] tracking-[-0.06em]",
                )}
              >
                Encuentra. Conecta. Resuelve.
              </Heading>
              <Text
                as="p"
                className={cn(
                  "text-white/56",
                  isStatic
                    ? "max-w-[28ch] text-[0.82rem] leading-[1.28rem]"
                    : "text-[0.9rem] leading-6",
                )}
              >
                Un solo lugar para conectar personas, servicios y proveedores.
              </Text>
            </div>

            <div className={cn("icon-shell", isStatic && "h-9 w-9 rounded-[1rem]")}>
              <Sparkles className="h-[18px] w-[18px] text-white/84" />
            </div>
          </div>

          <div className={cn("flex flex-wrap gap-2", isStatic && "gap-1.5")}>
            {pills.map((pill) => (
              <Badge
                key={pill}
                radius="full"
                className={cn("fati-badge", isStatic && "px-2.5 py-1 text-[0.64rem]")}
              >
                {pill}
              </Badge>
            ))}
          </div>

          <div className={cn("subsurface", isStatic && "rounded-[18px] px-3 py-2.5")}>
            <div className={cn(isStatic ? "space-y-0.5" : "space-y-1")}>
              <Text
                as="p"
                className={cn(
                  "font-medium text-white/90",
                  isStatic ? "text-[0.86rem]" : "text-sm",
                )}
              >
                Una experiencia clara y directa
              </Text>
              <Text
                as="p"
                className={cn(
                  "text-white/50",
                  isStatic ? "text-[0.74rem] leading-[1.08rem]" : "text-[0.82rem] leading-5",
                )}
              >
                Descubrir y conectar sin ruido visual.
              </Text>
            </div>

            <div className={cn("mini-accent", isStatic && "h-7 w-7 rounded-[10px]")}>
              <ArrowUpRight className="h-[15px] w-[15px] text-black" />
            </div>
          </div>
        </section>

        <section className={cn("grid grid-cols-3 gap-3", isStatic && "gap-2.5")}>
          {socialLinks.map(({ label, description, href, icon: Icon, placeholder }) => {
            const tone =
              label === "Instagram"
                ? "shortcut-card-cyan"
                : label === "Facebook"
                  ? "shortcut-card-green"
                  : "shortcut-card-purple";
            const iconTone =
              label === "Instagram"
                ? "shortcut-icon-cyan"
                : label === "Facebook"
                  ? "shortcut-icon-green"
                  : "shortcut-icon-purple";
            const card = (
              <>
                <div className={cn("shortcut-icon", iconTone, isStatic && "h-9 w-9 rounded-[14px]")}>
                  <Icon className="h-[18px] w-[18px] text-white/84" />
                </div>
                <Text
                  as="p"
                  className={cn(
                    "font-medium text-white/92",
                    isStatic ? "text-[0.82rem]" : "text-sm",
                  )}
                >
                  {label}
                </Text>
                <Text
                  as="p"
                  className={cn(
                    "text-white/50",
                    isStatic ? "text-[0.69rem] leading-[1rem]" : "text-[0.77rem] leading-5",
                  )}
                >
                  {description}
                </Text>
              </>
            );

            const cardClassName = cn(
              "shortcut-card",
              tone,
              isStatic && "min-h-[96px] gap-1.5 rounded-[18px] p-2.5",
              placeholder && "cursor-default opacity-72 hover:translate-y-0",
            );

            return href && !placeholder ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cardClassName}
              >
                {card}
              </a>
            ) : (
              <div key={label} className={cardClassName}>
                {card}
              </div>
            );
          })}
        </section>

        {isStatic ? (
          <section className="surface-card flex items-center justify-between gap-3 p-3">
            <div className="space-y-0.5">
              <Text as="p" className="section-kicker">
                Valor
              </Text>
              <Heading
                as="h3"
                size="4"
                className="text-[1.18rem] leading-none tracking-[-0.055em] text-white"
              >
                Todo fluye mejor
              </Heading>
            </div>

            <Text as="p" className="max-w-[15ch] text-right text-[0.76rem] leading-[1.08rem] text-white/52">
              Publica, descubre y conecta.
            </Text>
          </section>
        ) : (
          <section className="surface-card space-y-2">
            <Text as="p" className="section-kicker">
              Valor
            </Text>
            <Heading
              as="h3"
              size="5"
              className="text-[1.4rem] leading-none tracking-[-0.055em] text-white"
            >
              Todo fluye mejor
            </Heading>
            <Text as="p" className="max-w-[34ch] text-[0.9rem] leading-6 text-white/56">
              Publica, descubre y conecta desde una experiencia clara, rapida y elegante.
            </Text>
          </section>
        )}
      </div>
    </section>
  );
}

function App() {
  const mode = getCardMode();
  const isStatic = mode === "static";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        isStatic ? "min-h-[100dvh]" : "min-h-screen",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute left-[10%] top-[8%] rounded-full bg-[rgba(151,85,255,0.15)] blur-3xl",
            isStatic ? "h-40 w-40" : "h-52 w-52",
          )}
        />
        <div
          className={cn(
            "absolute right-[8%] top-[14%] rounded-full bg-[rgba(34,215,246,0.12)] blur-3xl",
            isStatic ? "h-36 w-36" : "h-44 w-44",
          )}
        />
        <div
          className={cn(
            "absolute bottom-[16%] left-[18%] rounded-full bg-[rgba(74,143,255,0.08)] blur-3xl",
            isStatic ? "h-28 w-28" : "h-40 w-40",
          )}
        />
      </div>

      <main
        className={cn(
          "relative mx-auto flex w-full max-w-[430px] items-center",
          isStatic ? "min-h-[100dvh] px-2.5 py-2" : "min-h-screen px-4 py-6",
        )}
      >
        <FatiCard mode={mode} />
      </main>
    </div>
  );
}

export default App;
