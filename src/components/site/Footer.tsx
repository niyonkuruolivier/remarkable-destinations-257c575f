import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-auto invert" />
              <div className="leading-tight">
                <div className="font-display text-2xl italic text-ivory">Remarkable</div>
                <div className="text-[10px] tracking-[0.34em] uppercase text-gold">Destinations</div>
              </div>
            </div>
            <p className="mt-8 max-w-md text-[15px] leading-[1.8] text-ivory/70">
              A bespoke safari atelier, designing privileged passages through East and
              Southern Africa. Quietly crafted from Kigali, Rwanda.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Explore</div>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory/75">
              <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
              <li><Link to="/journeys" className="hover:text-gold">Signature Journeys</Link></li>
              <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
              <li><Link to="/journal" className="hover:text-gold">The Journal</Link></li>
              <li><Link to="/about" className="hover:text-gold">Atelier</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow">Atelier</div>
            <ul className="mt-6 space-y-4 text-[14px] text-ivory/75">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> KG 7 Avenue, Kacyiru, Kigali, Rwanda</li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-gold" /> hello@remarkabledestinations.co</li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-gold" /> +250 788 000 000</li>
              <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-4 w-4 text-gold" /> @remarkable.destinations</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-[12px] tracking-[0.16em] uppercase text-ivory/40 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Remarkable Destinations</div>
          <div>Bespoke Safaris · Kigali · Since 2014</div>
        </div>
      </div>
    </footer>
  );
}